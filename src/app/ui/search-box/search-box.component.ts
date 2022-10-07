import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

@UntilDestroy()
@Component({
  selector: 'sthtr-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit {
  public searchControl = new FormControl('');

  @Output() public searchChanged = new EventEmitter<string>();

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((str) => this.searchChanged.emit(str || ''));
  }
}
