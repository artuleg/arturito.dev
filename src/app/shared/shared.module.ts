import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConnectComponent } from './dialog-connect/dialog-connect.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
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
