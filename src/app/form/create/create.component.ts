import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CdsButtonModule,
  CdsCheckboxModule,
  CdsDividerModule,
  CdsFormFieldModule,
  CdsIconModule,
  CdsInputModule,
  CdsSelectModule,
  CdsTooltipModule,
} from '@criteo/cds15-library';

@Component({
  standalone: true,
  imports: [
    CommonModule,
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
  ],
  selector: 'ig-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    bidder: [null, Validators.required],
    description: [''],
    data_fee: [0, Validators.min(0)],
    advertiser: [null, Validators.required],
    availability: [true],
  });

  private get formValue() {
    return this.form.value;
  }

  submit() {
    console.log(this.formValue);
  }
}
