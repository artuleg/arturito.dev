import { Component, OnInit } from '@angular/core';

interface Card {
  value: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {

  cards: Card[] = [];
  numberOfCards: number = 10; // Valor por defecto
  
  flippedCards: Card[] = [];

  matchedPairs: number = 0;
  gameComplete: boolean = false;

  startTime!: Date;
  elapsedTime: number = 0;
  timerInterval: any;

  constructor() { }

  ngOnInit(): void {

  }

  startTimer() {
    this.startTime = new Date();
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Math.floor((new Date().getTime() - this.startTime.getTime()) / 1000);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  generateCards() {
    this.cards = [];
    const uniqueValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < this.numberOfCards / 2; i++) {
      const value = uniqueValues[i];
      this.cards.push({ value, flipped: false, matched: false });
      this.cards.push({ value, flipped: false, matched: false });
    }
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  flipCard(index: number) {
    if (!this.cards[index].flipped && this.flippedCards.length < 2) {
      this.cards[index].flipped = true;
      this.flippedCards.push(this.cards[index]);

      if (this.flippedCards.length === 2) {
        setTimeout(() => this.checkMatch(), 1000);
      }
    }
  }

  checkMatch() {
    if (this.flippedCards[0].value === this.flippedCards[1].value) {
      this.flippedCards.forEach(card => card.matched = true);
      this.matchedPairs++;

      if (this.matchedPairs === this.cards.length / 2) {
        this.gameComplete = true;
        this.stopTimer();
      }
    } else {
      this.flippedCards.forEach(card => card.flipped = false);
    }

    this.flippedCards = [];
  }

  restartGame() {
    this.generateCards();
    this.startTimer();

    this.cards.forEach(card => {
      card.flipped = false;
      card.matched = false;
    });
    this.shuffleCards();
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.gameComplete = false;
  }
}
