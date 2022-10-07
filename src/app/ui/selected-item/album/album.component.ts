import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core'
import { Album, Track } from 'src/app/services/spotify.model'

@Component({
  selector: 'sthtr-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumComponent {

  @Input() public album?: Album;
  
  @Output() public selected = new EventEmitter()

  public selectTrack(item: Track) {
    this.selected.emit({ type: 'track', item })
  }

}
