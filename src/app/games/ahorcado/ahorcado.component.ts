import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

const btoa = (str: string) => window.btoa(unescape(encodeURIComponent(str)));
const atob = (str: string) => decodeURIComponent(escape(window.atob(str)));

@Component({
  selector: 'arturo-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {
  selectedWord!: string;
  wordToShow!: string;
  remainingAttempts: number = 6;
  letter: string = '';
  guessedLetters: string[] = [];
  gameOver: boolean = false;
  isVictory: boolean = false;
  alertMessages: string[] = [];
  game: any;
  gameLoaded = false;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadState(); // Cargar el estado al iniciar
      if (!this.gameLoaded) {
        this.startGame();
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeunload', () => {
        this.saveState(); // Guardar el estado antes de recargar la página
      });
    }
  }

  saveState() {
    const state = {
      selectedWord: this.selectedWord,
      wordToShow: this.wordToShow,
      remainingAttempts: this.remainingAttempts,
      letter: this.letter,
      guessedLetters: this.guessedLetters,
      gameOver: this.gameOver,
      isVictory: this.isVictory,
      alertMessages: this.alertMessages,
      game: this.game
    };
    const encodedState = btoa(JSON.stringify(state));
    sessionStorage.setItem('hangmanState', encodedState);
  }

  loadState() {
    const encodedState = sessionStorage.getItem('hangmanState');
    if (encodedState) {
      const decodedState = JSON.parse(atob(encodedState));
      if (!this.mismoCaracter(decodedState.wordToShow)) {
        Object.assign(this, decodedState);
        this.gameLoaded = true;
      }
       
    }
  }

  mismoCaracter(str: string) {
    return str.split('').every(char => char === str[0]);
  }

  startGame() {
    if (!this.gameLoaded) {
      this.http.get<string[]>('https://clientes.api.greenborn.com.ar/public-random-word').subscribe((res) => {
        this.selectedWord = res[0].toUpperCase();
        this.wordToShow = '_'.repeat(this.selectedWord.length);
        this.remainingAttempts = 6;
        this.guessedLetters = [];
        this.gameOver = false;
        this.isVictory = false;
        this.gameLoaded = true;
      });
    }
  }

  showAlert(message: string) {
    this.alertMessages.push(message);
  }

  clearAlerts() {
    this.alertMessages = [];
  }

  checkLetter() {
    if (this.remainingAttempts > 0 && this.letter.length === 1 && /^[a-zA-Z]+$/.test(this.letter)) {
      this.showAlert('Usas la letra: ' + this.letter);
      if (this.guessedLetters.includes(this.letter.toUpperCase())) {
        this.showAlert('Ya has intentado con esa letra: ' + this.letter);
      } else if (this.selectedWord.includes(this.letter.toUpperCase())) {
        this.guessedLetters.push(this.letter.toUpperCase());
        this.updateWordToShow();
        if (!this.wordToShow.includes('_')) {
          this.gameOver = true;
          this.isVictory = true;
        }
      } else {
        this.remainingAttempts--;
        this.guessedLetters.push(this.letter.toUpperCase());
        if (this.remainingAttempts === 0) {
          this.gameOver = true;
        }
      }

      if(this.isVictory || this.gameOver) {
        this.http.post<{ lost: number, win: number }>(`${environment.api}/games/hangman`, { 
          type: this.isVictory ? 'win' : 'lost'
        }).subscribe(res => {
          this.game = res;
        });
      }
    } else {
      this.showAlert('Ingresa una letra válida y no repetida.');
    }
    this.letter = '';
  }

  updateWordToShow() {
    this.wordToShow = this.selectedWord.split('').map(letter =>
      this.guessedLetters.includes(letter) ? letter : '_'
    ).join('');
  }

  resetGame() {
    this.wordToShow = '';
    sessionStorage.removeItem('hangmanState');
    this.gameLoaded = false;
    this.clearAlerts();
    this.startGame();
  }
}
