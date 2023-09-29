import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeInARowComponent } from './three-in-a-row/three-in-a-row.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ThreeInARowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '3row', component: ThreeInARowComponent }
    ])
  ]
})
export class GamesModule { }
