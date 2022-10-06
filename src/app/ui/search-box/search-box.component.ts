import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { debounceTime } from 'rxjs'

@UntilDestroy()
@Component({
  selector: 'sthtr-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit {

  public searchControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(untilDestroyed(this), debounceTime(500)).subscribe(it => {
      console.log(it)
    })
  }

}
