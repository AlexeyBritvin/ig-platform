import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CdsButtonModule,
  CdsDialogModule,
  CdsDialogPanelClasses,
  CdsFormFieldModule,
  CdsIconModule,
  CdsInputModule,
  CdsTableModule,
  CdsTableToolbarComponent,
} from '@criteo/cds15-library';
import { InterestGroup, InterestGroupService } from 'src/app/api';
import { ScriptModalComponent } from 'src/app/script-modal/script-modal.component';

@Component({
  selector: 'ig-list',
  standalone: true,
  imports: [
    CommonModule,
    CdsTableModule,
    CdsButtonModule,
    CdsTableToolbarComponent,
    CdsFormFieldModule,
    CdsInputModule,
    CdsIconModule,
    CdsDialogModule,
    FlexModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private igService = inject(InterestGroupService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  dataSource$ = this.igService.get();

  displayedColumns: string[] = [
    'id',
    'name',
    'bidder',
    'advertiser',
    'description',
    'data_fee',
    'actions',
  ];

  openModal(ig: InterestGroup): void {
    const panelClass: CdsDialogPanelClasses[] = ['cds-modal', 'small'];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = panelClass;
    dialogConfig.data = ig;

    this.dialog.open(ScriptModalComponent, dialogConfig);
  }

  onEdit(element: InterestGroup) {
    this.router.navigate(['ig', `${element.id}`]);
  }
}
