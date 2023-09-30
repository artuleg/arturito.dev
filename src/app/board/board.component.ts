import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'arturo-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  estefaniaTasks: string[] = [];
  arturoTasks: string[] = [];
  newEstefaniaTask: string = '';
  newArturoTask: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.api}/board`).subscribe(res => {
      console.log(res);
      res.forEach(e => {
        if (e.person == 'estefania') {
          e.awards.forEach((a: any) => this.estefaniaTasks.push(a.name))
        }
      });
    });
  }

  addTask(person: string) {
    if (person === 'estefania' && this.newEstefaniaTask.trim() !== '') {
      this.http.post(`${environment.api}/board/${person}`, { award: { name: this.newEstefaniaTask } }).subscribe();

      this.estefaniaTasks.push(this.newEstefaniaTask);
      this.newEstefaniaTask = '';
    } else if (person === 'arturo' && this.newArturoTask.trim() !== '') {
      this.arturoTasks.push(this.newArturoTask);
      this.newArturoTask = '';
    }
    
  }

  removeTask(person: string, task: string) {
    if (person === 'estefania') {
      this.estefaniaTasks = this.estefaniaTasks.filter(t => t !== task);
    } else if (person === 'arturo') {
      this.arturoTasks = this.arturoTasks.filter(t => t !== task);
    }
  }
}
