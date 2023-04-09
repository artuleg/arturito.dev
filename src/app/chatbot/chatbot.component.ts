import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: any[] = [];
  userMessage = '';
  conversation: {role: string, content: string}[] = [
    { role: 'assistant', content: 'Eres el chatbot ayudante de especialista en IT llamado Arturo.' }
  ];

  constructor(private http: HttpClient) {}

  sendMessage() {
    this.messages.push({ text: this.userMessage, from: 'sent' });
    this.conversation.push({ role: 'user', content: this.userMessage });
    this.http.post<any>(`${environment.api}/chatai`, { messages: this.conversation }).subscribe((res => {
      this.messages.push({ text: res.message, from: 'received' });
      this.conversation.push({ role: 'assistant', content: res.message });
    }));

    this.userMessage = '';
  }
}
