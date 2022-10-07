import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'sthtr-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultItemComponent {

  public hover = false
  @Input() public image?: string
  @Input() public name = ''

}
