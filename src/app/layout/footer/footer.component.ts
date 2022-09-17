import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'arturo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  numberVisitors: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{count: number}>(`${environment.api}/visitor/count`).subscribe(res => {
      const incrementer = setInterval(() => {
        this.numberVisitors++;
        if (this.numberVisitors == res.count) {
          clearInterval(incrementer);
        }
      }, 100);
    });
  }

}
