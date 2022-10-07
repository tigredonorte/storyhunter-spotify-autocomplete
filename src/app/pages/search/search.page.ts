import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { BehaviorSubject, take } from 'rxjs'
import { Item, Results } from 'src/app/services/spotify.model'
import { SpotifyService } from 'src/app/services/spotify.service'
import { WindowService } from 'src/app/services/window.service'
import { PopupComponent } from './popup/popup.component'

@Component({
  selector: 'sthtr-meu-component1',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public currentSearch = '';
  public albums?: Results['albums']['items'];
  public artists?: Results['artists']['items'];
  public tracks?: Results['tracks']['items'];

  public selected$? = new BehaviorSubject<Item | undefined>(undefined);
  public selectedType$? = new BehaviorSubject< 'artist' | 'track' | 'album' | undefined>(undefined);
  public loading$ = new BehaviorSubject<boolean>(false);
  public sizes$ = this.windowService.getSize$()

  constructor(
    private spotifyService: SpotifyService,
    private windowService: WindowService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  public search(str: string) {
    this.currentSearch = str;
    this.spotifyService
      .search(str ?? '')
      .pipe(take(1))
      .subscribe((it) => {
        this.albums = it?.albums?.items || [];
        this.tracks = it?.tracks?.items || [];
        this.artists = it?.artists?.items || [];
        this.cd.markForCheck();
      });
  }

  public setSelected = (
    data: { type: 'artist' | 'track' | 'album'; item: Item },
    forceLoad = false
  ) => {
    this.openDialog();
    this.selectedType$?.next(undefined);
    this.selected$?.next(undefined);
    this.loading$.next(true);
    switch (data.type) {
      case 'artist':
        return this.spotifyService
          .getArtist(data.item.id)
          .subscribe((result) => {
            this.selectedType$?.next(data.type);
            this.selected$?.next({ ...data.item, albums: result });
            this.loading$.next(false);
          });
      case 'track':
        if (forceLoad) {
          this.selectedType$?.next(data.type);
          this.selected$?.next(data.item);
          this.loading$.next(false);
          return;
        }
        return this.spotifyService
          .getTrack(data.item.id)
          .subscribe((result) => {
            this.selectedType$?.next(data.type);
            this.selected$?.next(result);
            this.loading$.next(false);
          });
      case 'album':
        return this.spotifyService
          .getAlbum(data.item.id)
          .subscribe((result) => {
            this.selectedType$?.next(data.type);
            this.selected$?.next({ ...data.item, tracks: result });
            this.loading$.next(false);
          });
    }
  };

  public openDialog(): void {
    if (this.windowService.getSize('for-tablet-landscape-down')) {
      return
    }
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '90vw',
      height: '90vh',
      data: {
        selected$: this.selected$,
        selectedType$: this.selectedType$,
        loading$: this.loading$,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.setSelected(result)
      }
    });
  }
}
