import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, startWith } from 'rxjs';
import {
  Advertiser,
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
  private snackbar = inject(SnackbarService);
  private advService = inject(AdvertiserService);
  private bidderService = inject(BiddersService);
  private igService = inject(InterestGroupService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id!: number | null;

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    bidder: new FormControl<null | number>(null, {
      validators: Validators.required,
    }),
    description: new FormControl<string | null>(null),
    data_fee: new FormControl(0, {
      nonNullable: true,
      validators: Validators.min(0),
    }),
    advertiser: new FormControl<number | string | null>(null),
    availability: new FormControl<boolean>(true, { nonNullable: true }),
  });

  advertisers: Advertiser[] = [];
  bidders: WithName[] = [];

  private get formValue() {
    return this.form.value;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.form.controls.availability.valueChanges
      .pipe(startWith(!!this.form.value.availability), untilDestroyed(this))
      .subscribe((value) => {
        this.onAvailabilityChange(value);
      });
    this.advService.get().subscribe((data) => (this.advertisers = data));
    this.bidderService.get().subscribe((data) => (this.bidders = data));

    if (this.id) {
      this.igService
        .get()
        .pipe(
          untilDestroyed(this),
          map((groups) => groups.find((group) => group.id === this.id)),
          filter((group) => !!group)
        )
        .subscribe((value: InterestGroup | undefined) => {
          if (!value) return;
          this.form.patchValue({
            name: value.name,
            bidder: value.bidder,
            advertiser: value.advertiser,
            description: value.description,
            data_fee: value.data_fee,
            availability: value.availability,
          });
          this.form.disable();
        });
    }
  }

  private onAvailabilityChange(value: boolean) {
    if (this.id) return;
    const control = this.form.controls.advertiser;
    if (value) {
      control.removeValidators(Validators.required);
      control.disable();
    } else {
      control.addValidators(Validators.required);
      control.enable();
    }
  }

  submit() {
    this.id ? this.save() : this.create();
  }

  private create() {
    const data = this.formValue;
    // if (data.availability) {
    //   data.advertiser = ADVERTISER_ID;
    // }
    this.igService
      .create(data as unknown as InterestGroupCreate)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: async (res: InterestGroup) => {
          await this.router.navigate(['ig', `${res.id}`]);
          this.snackbar.open(
            {
              type: 'success',
              message: 'The Interest Group has been successfully created!',
            },
            1000
          );
        },
        error: () =>
          this.snackbar.open(
            {
              type: 'error',
              message: 'Could not create the Interest Group',
            },
            1500
          ),
      });
  }

  private save() {
    this.igService
      .edit(this.formValue as unknown as InterestGroup)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.snackbar.open(
            {
              type: 'success',
              message: 'The Interest Group has been successfully saved!',
            },
            1000
          );
        },
        error: () =>
          this.snackbar.open(
            {
              type: 'error',
              message: 'Could not save the Interest Group',
            },
            1500
          ),
      });
  }

  openModal(): void {
    const panelClass: CdsDialogPanelClasses[] = ['cds-modal', 'small'];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = panelClass;
    const data: Record<string, any> = this.formValue;
    if (this.id) {
      data['id'] = this.id;
    }
    dialogConfig.data = data;

    this.dialog.open(ScriptModalComponent, dialogConfig);
  }
}
