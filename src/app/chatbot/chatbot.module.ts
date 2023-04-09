import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatbotComponent } from './chatbot.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ChatbotComponent}]),

    MatIconModule
  ]
})
export class ChatbotModule { }
