import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { Track } from 'src/app/services/spotify.model'

@Component({
  selector: 'sthtr-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackComponent implements OnInit {

  @Input() public track?: Track;

  constructor() { }

  ngOnInit(): void {
    console.log(this.track)
  }

}
