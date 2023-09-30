import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social.component';
import { RouterModule } from '@angular/router';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';


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
