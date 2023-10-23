import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';



@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatLegacyButtonModule,
    RouterModule.forChild([
      { path: '', component: BoardComponent }
    ])
  ]
})
export class BoardModule { }
