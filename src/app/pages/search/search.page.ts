import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'sthtr-meu-component1',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
