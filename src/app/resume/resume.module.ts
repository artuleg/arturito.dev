import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { RouterModule } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';



@NgModule({
  declarations: [
    ResumeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: ResumeComponent} ]),

    NgxExtendedPdfViewerModule
  ]
})
export class ResumeModule { }
