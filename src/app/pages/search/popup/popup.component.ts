import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { Item } from 'src/app/services/spotify.model'

export interface DialogData {
  selected$?: Observable<Item>;
  selectedType$?: Observable<'artist' | 'track' | 'album'>;
  loading$: Observable<boolean>;
}

@Component({
  selector: 'sthtr-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  public setSelected(data: { type: 'artist' | 'track' | 'album'; item: Item }) {
    this.dialogRef.close(data);
  }
}
