import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'
import { take } from 'rxjs'
import { Album, Artist, Results, Track } from 'src/app/services/spotify.model'
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

  constructor(private spotifyService: SpotifyService, private cd: ChangeDetectorRef) { }

  public search(str: string) {
    this.currentSearch = str;
    this.spotifyService.search(str ?? '').pipe(take(1)).subscribe(it => {
      this.albums = it?.albums?.items || [];
      this.tracks = it?.tracks?.items || [];
      this.artists = it?.artists?.items || [];
      this.cd.markForCheck();
    })
  }

  public setSelected(data: { type: keyof Results, item: Album | Track | Artist }) {
    console.log({ data })
  }

}
