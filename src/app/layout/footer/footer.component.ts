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
      const maxTime = 7000; // 7 segundos en milisegundos
      const incrementAmount = (res.count / maxTime) * 100; // Incremento por milisegundo

      let currentTime = 0;
      const incrementer = setInterval(() => {
        this.numberVisitors += Math.round(incrementAmount);
        currentTime += 100;
        if (currentTime >= maxTime) {
          clearInterval(incrementer);
          this.numberVisitors = res.count; // Asegurarse de que el contador alcance el máximo
        }
      }, 100);
    });
  }

}
