import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'arturo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onClickMenuIcon = new EventEmitter<void>()
  @Input() menuOpened: boolean = true;
  @Input() menuMode: MatDrawerMode = 'side';

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.onClickMenuIcon.emit();
  }

}
