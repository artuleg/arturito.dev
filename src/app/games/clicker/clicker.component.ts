import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'arturo-clicker',
  templateUrl: 'clicker.component.html',
  styleUrls: ['./clicker.component.scss']
})
export class ClickerComponent implements OnInit {
  score = 0;
  boxTop = 0;
  boxLeft = 0;
  gameOver = false;
  timeLeft: number = 60;
  timer: any;
  headerHeight = 60;
  footerHeight = 72;
  game!: { record: number, beated: boolean };

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  generateRandomPosition() {
    if (isPlatformBrowser(this.platformId)) {
      const maxTop = window.innerHeight - this.footerHeight - 100;
      let maxLeft = window.innerWidth > 1024 ? 924 : window.innerWidth - 100;
      if ((<HTMLElement> document.querySelector('mat-sidenav'))?.style.visibility == 'visible') {
        maxLeft = maxLeft - 245;
      }

      let validPosition = false;

      while (!validPosition) {
        const newTop = Math.floor(Math.random() * maxTop);
        const newLeft = Math.floor(Math.random() * maxLeft);

        if (newTop > this.headerHeight && newTop < maxTop) {
          this.boxTop = newTop;
          this.boxLeft = newLeft;
          validPosition = true;
        }
      }
    }
  }

  ngOnInit() {
    this.generateRandomPosition();
    this.startTimer();
  }

  startTimer() {
    this.timeLeft = 20;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.gameOver = true;
        this.http.post<{ record: number, beated: boolean }>(`${environment.api}/games/clicker`, { score: this.score }).subscribe(res => {
          this.game = res;
        })
        clearInterval(this.timer);
      }
    }, 1000);
  }

  handleClick() {
    if (!this.gameOver) {
      this.score++;
      this.generateRandomPosition();
    }
  }

  restartGame() {
    this.score = 0;
    this.gameOver = false;
    this.generateRandomPosition();
    this.startTimer();
  }
}