import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core'
import { Track } from 'src/app/services/spotify.model'

@Component({
  selector: 'sthtr-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackComponent {

  @Input() public track?: Track;

}
