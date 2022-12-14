import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core'
import { Album, Artist, Results, Track } from 'src/app/services/spotify.model'

@Component({
  selector: 'sthtr-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent {

  @Input() public albums?: Results['albums']['items']
  @Input() public artists?: Results['artists']['items']
  @Input() public tracks?: Results['tracks']['items']

  @Output() public onSelect = new EventEmitter()
  @Output() public prevPage = new EventEmitter()
  @Output() public nextPage = new EventEmitter()

  public select(title: string, item: Album | Track | Artist) {
    this.onSelect.emit({ type: title, item })
  }

}
