import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    SocialComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: SocialComponent } ]),

    MatListModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SocialModule { }
