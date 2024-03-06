import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  CdsButtonModule,
  CdsCheckboxModule,
  CdsDialogModule,
  CdsDialogPanelClasses,
  CdsDividerModule,
  CdsFormFieldModule,
  CdsIconModule,
  CdsInputModule,
  CdsSelectModule,
  CdsSnackbarModule,
  CdsTooltipModule,
  SnackbarService,
} from '@criteo/cds15-library';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  AdvertiserService,
  BiddersService,
  InterestGroup,
  InterestGroupCreate,
  InterestGroupService,
  WithName,
} from 'src/app/api';
import { ScriptModalComponent } from 'src/app/script-modal/script-modal.component';

@UntilDestroy()
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    CdsFormFieldModule,
    CdsIconModule,
    CdsTooltipModule,
    CdsInputModule,
    CdsButtonModule,
    CdsSelectModule,
    CdsCheckboxModule,
    CdsDividerModule,
    CdsSnackbarModule,
    CdsDialogModule,
  ],
  selector: 'ig-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackbar = inject(SnackbarService);
  private advService = inject(AdvertiserService);
  private bidderService = inject(BiddersService);
  private igService = inject(InterestGroupService);
  private dialog = inject(MatDialog);

  form = this.fb.group({
    name: ['', Validators.required],
    bidder: [null, Validators.required],
    description: [''],
    data_fee: [0, Validators.min(0)],
    advertiser: [null, Validators.required],
    availability: [true],
  });

  iframeScript: string = '';
  advertisers: WithName[] = [];
  bidders: WithName[] = [];

  private get formValue() {
    return this.form.value;
  }

  ngOnInit(): void {
    this.advService.get().subscribe((data) => (this.advertisers = data));
    this.bidderService.get().subscribe((data) => (this.bidders = data));
  }

  submit() {
    this.igService
      .create(this.formValue as unknown as InterestGroupCreate)
      .subscribe((res: InterestGroup) => {
        this.openModal(res);
      });
  }

  openModal(ig: InterestGroup): void {
    const panelClass: CdsDialogPanelClasses[] = ['cds-modal', 'small'];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = panelClass;
    dialogConfig.data = ig;

    this.dialog.open(ScriptModalComponent, dialogConfig);
  }
}
