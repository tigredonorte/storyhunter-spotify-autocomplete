import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core'
import { Item } from 'src/app/services/spotify.model'

@Component({
  selector: 'sthtr-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftComponent {

  @Input() public selected?: Item;
  @Input() public selectedType: 'artist' | 'track' | 'album' | undefined;
  @Input() public loading = false;

  @Output() public onSelect = new EventEmitter()

  public setSelected(data: { type: "track" | "artist" | "album"; item: Item; }) {
    this.onSelect.emit(data)
  }

}
