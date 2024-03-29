import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'arturo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() onNavigate = new EventEmitter<null>();
  
  menus = [
    { icon: 'home', name: 'Home', path: '' },
    { icon: 'favorite', name: 'Projects', path: 'projects' },
    { icon: 'public', name: 'Social', path: 'social' },
    { icon: 'badge', name: 'CV', path: 'resume' },
    { icon: 'games', name: 'Games', submenus: [
      { name: 'Three in a row', path: 'games/three-row' },
      { name: 'Clicker', path: 'games/clicker' },
      { name: 'Hangman', path: 'games/hangman' },
      { name: 'Memory', path: 'games/memory' }
    ] }
  ]

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
  }

  emitNavigate() {
    this.onNavigate.emit();
  }

  navigate(menu: any) {
    this.router.navigateByUrl(menu.path);
    this.onNavigate.emit();
  }

  activeMenu(menu: any): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return location.pathname.replace('/', '') === menu.path;
    }
    return false;
  }

}
