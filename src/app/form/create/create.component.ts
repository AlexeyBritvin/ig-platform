import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {
  CdsButtonModule,
  CdsCheckboxModule,
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
  private cdr = inject(ChangeDetectorRef);

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

  private createIframeScript(value: InterestGroup) {
    const clientId = 500002;
    this.iframeScript = `<iframe src="https://gpsb-reims.criteo.com/paapi/join_ig?advertiser_id=${clientId}_${value.advertiser}&ig_name=${value.name}"></iframe>`;
  }

  submit() {
    this.igService
      .create(this.formValue as unknown as InterestGroupCreate)
      .subscribe((res: InterestGroup) => {
        this.createIframeScript(res);
        this.cdr.detectChanges();
      });
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
}
