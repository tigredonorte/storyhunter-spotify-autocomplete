import { ChangeDetectionStrategy, Component } from '@angular/core'
import { take } from 'rxjs'
import { SpotifyService } from 'src/app/services/spotify.service'

@Component({
  selector: 'sthtr-meu-component1',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  public results: any[] = []
  constructor(private spotifyService: SpotifyService) { }

  public search(str: string) {
    this.spotifyService.search(str ?? '').pipe(take(1)).subscribe(it => this.results = it)
  }

}
