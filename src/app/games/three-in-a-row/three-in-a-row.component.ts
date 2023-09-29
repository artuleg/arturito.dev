import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-in-a-row',
  templateUrl: './three-in-a-row.component.html',
  styleUrls: ['./three-in-a-row.component.scss']
})
export class ThreeInARowComponent implements OnInit {
  currentPlayer: string = 'X';
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  ngOnInit() {
    setInterval(() => {
      if (this.currentPlayer === 'O') {
        this.makeAIMove()
      }
    }, 100); // La IA comienza si es 'O'
  }

  makeAIMove() {
    if (!this.checkWinner()) {
      let bestScore = -Infinity;
      let move;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === '') {
            this.board[i][j] = 'O';
            let score = this.minimax(this.board, 0, false);
            this.board[i][j] = '';
            if (score > bestScore) {
              bestScore = score;
              move = { i, j };
            }
          }
        }
      }

      if (move) {
        this.makeMove(move.i, move.j);
      }
    }
  }

  minimax(board: any, depth: any, isMaximizing: any) {
    let result = this.checkWinner();
    if (result !== null) {
      return result === 'O' ? 1 : result === 'X' ? -1 : 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'O';
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'X';
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  makeMove(row: number, col: number) {
    if (this.board[row][col] === '' && !this.checkWinner()) {
      this.board[row][col] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkWinner(): string | null {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== ''
      ) {
        return this.board[i][0];
      }

      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== ''
      ) {
        return this.board[0][i];
      }
    }

    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[0][0] !== ''
    ) {
      return this.board[0][0];
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0] &&
      this.board[0][2] !== ''
    ) {
      return this.board[0][2];
    }

    if (this.board.flat().every(cell => cell !== '')) {
      return 'Draw';
    }

    return null;
  }

  restartGame() {
    this.currentPlayer = 'X';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }
}
