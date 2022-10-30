import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgTerminal } from 'ng-terminal';
import { FunctionsUsingCSI } from 'ng-terminal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'arturo-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('term', {static: false}) child!: NgTerminal;
  screenHeigth = window.innerHeight - 120 - 80
  readonly prompt$ = '\n' + FunctionsUsingCSI.cursorColumn(1) + '> ';
  readonly prompt = '\n' + FunctionsUsingCSI.cursorColumn(1) + '';
  command = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.child.write('> Welcome to Arturito\'s live console');
    this.child.write(this.prompt$);
    this.child.onData().subscribe((input) => {
      if (input === '\r') { // Carriage Return (When Enter is pressed)
        this.child.write(this.prompt);
      } else if (input === '\u007f') { // Delete (When Backspace is pressed)
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (input === '\u0003') { // End of Text (When Ctrl and C are pressed)
          this.child.write('^C');
          this.child.write(this.prompt);
      }else
        this.child.write(input);
    });
  }

  onKeyInput(event: any) {
    console.log('input', event);
    this.command = this.command + event;
    console.log(this.command);
  }

  onKeyEvent(event: any) {
    console.log('event', event);
    if (event.key == '\x7F') {
      this.command = this.command.substring(0, this.command.length - 1);
    }
    if (event.key == '\r') {
      this.http.post<any>(`${environment.api}/chat/answer`, { question: this.command.replace('\r', '') }).subscribe((res => {
        this.child.write(res.answer[0])
        this.child.write(this.prompt$);
      }));
      this.command = '';
    }
  }

}
