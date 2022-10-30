import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgTerminalModule } from 'ng-terminal';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    NgTerminalModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: ChatComponent }])
  ]
})
export class ChatModule { }
