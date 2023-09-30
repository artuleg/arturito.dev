import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'arturo-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: any[] = [];
  userMessage = '';
  

  constructor(private http: HttpClient) {}

  sendMessage() {
    this.messages.push({ text: this.userMessage, from: 'sent' });
    this.http.post<any>(`${environment.api}/chatai`, { message: this.userMessage }).subscribe((res => {
      this.messages.push({ text: res.message, from: 'received' });
    }));

    this.userMessage = '';
  }
}
