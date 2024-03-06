import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CdsButtonModule,
  CdsFormFieldModule,
  CdsIconModule,
  CdsInputModule,
  CdsModalModule,
  SnackbarService,
} from '@criteo/cds15-library';
import { md5 } from 'js-md5';
import { ADVERTISER_ID, InterestGroup } from '../api';

@Component({
  selector: 'ig-script-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexModule,
    ClipboardModule,
    CdsFormFieldModule,
    CdsInputModule,
    CdsModalModule,
    CdsButtonModule,
    CdsIconModule,
  ],
  templateUrl: './script-modal.component.html',
  styleUrls: ['./script-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScriptModalComponent {
  constructor(
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: InterestGroup,
    public dialogRef: MatDialogRef<ScriptModalComponent>
  ) {
    this.createIframeScript(this.data);
  }

  iframeScript: string = '';

  private createIframeScript(value: InterestGroup) {
    const userId = 1;
    md5(`igap_${userId}_${value.name}`);
    const hash = md5.create();
    const hashedString = hash.toString();
    const advertiserId = value.advertiser
      ? `${value.advertiser_external_id}_${value.advertiser}`
      : ADVERTISER_ID;
    this.iframeScript = `<iframe src="https://gpsb-reims.criteo.com/paapi/join_ig?advertiser_id=${advertiserId}&ig_name=${hashedString}"></iframe>`;
  }

  copy() {
    this.snackbar.open(
      {
        type: 'success',
        message: 'The Script has been successfully copied!',
      },
      1000
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
