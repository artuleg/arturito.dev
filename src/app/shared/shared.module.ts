import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConnectComponent } from './dialog-connect/dialog-connect.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';


@NgModule({
  declarations: [
    DialogConnectComponent,
    DialogUpdateComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    DialogConnectComponent,
    DialogUpdateComponent
  ]
})
export class SharedModule { }
