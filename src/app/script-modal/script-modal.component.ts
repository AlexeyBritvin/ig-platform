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
import { InterestGroup } from '../api';

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
    const clientId = 500002;
    this.iframeScript = `<iframe src="https://gpsb-reims.criteo.com/paapi/join_ig?advertiser_id=${clientId}_${value.advertiser}&ig_name=${value.name}"></iframe>`;
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
