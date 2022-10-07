import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'
import { Router } from '@angular/router'
import { take } from 'rxjs'
import { Item, Results } from 'src/app/services/spotify.model'
import { SpotifyService } from 'src/app/services/spotify.service'

@Component({
  selector: 'sthtr-meu-component1',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  public currentSearch = '';
  public albums?: Results['albums']['items'];
  public artists?: Results['artists']['items'];
  public tracks?: Results['tracks']['items'];
  public selected?: Item;
  public selectedType?: 'artist' | 'track' | 'album';

  constructor(private spotifyService: SpotifyService, private cd: ChangeDetectorRef, private router: Router) { }

  public search(str: string) {
    this.currentSearch = str;
    this.spotifyService.search(str ?? '').pipe(take(1)).subscribe(it => {
      this.albums = it?.albums?.items || [];
      this.tracks = it?.tracks?.items || [];
      this.artists = it?.artists?.items || [];
      this.cd.markForCheck();
    })
  }

  public setSelected = (data: { type: 'artist' | 'track' | 'album', item: Item }) => {
    this.selectedType = undefined;
    this.selected = undefined;
    switch (data.type) {
      case 'artist':
        return this.spotifyService.getArtist(data.item.id).subscribe(result => {
          this.selected = { ...data.item, albums: result };
          this.selectedType = data.type;
        })
      case 'track':
        this.selected = data.item;
        this.selectedType = data.type;
        return;
      case 'album':
        return this.spotifyService.getAlbum(data.item.id).subscribe(result => {
          this.selected = { ...data.item, tracks: result };
          this.selectedType = data.type;
        })
    }
  }

}
