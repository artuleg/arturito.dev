import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'arturo-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss']
})
export class DialogUpdateComponent implements OnInit {

  seconds = 15;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.seconds--;
      if (this.seconds == 0) {
        document.location.reload();
      }
    }, 1000);
  }

}
