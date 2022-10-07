import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core'
import { Album, Artist } from 'src/app/services/spotify.model'

@Component({
  selector: 'sthtr-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistComponent {

  @Input() public artist?: Artist;

  @Output() public selected = new EventEmitter()
  public selectAlbum(item: Album) {
    this.selected.emit({ type: 'album', item })
  }
}
