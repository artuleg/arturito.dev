import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConnectComponent } from './dialog-connect/dialog-connect.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DialogConnectComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    DialogConnectComponent
  ]
})
export class SharedModule { }
