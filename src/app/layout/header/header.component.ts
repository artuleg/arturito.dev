import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'arturo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onClickMenuIcon = new EventEmitter<void>()
  @Input() menuOpened: boolean = true;
  @Input() menuMode: MatDrawerMode = 'side';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }

  showSnack(message: string) {
    this.snackBar.open(message, '', {verticalPosition: 'top', duration: 2000, panelClass: 'center-snack'});
  }

  toggleMenu(): void {
    this.onClickMenuIcon.emit();
  }

}
