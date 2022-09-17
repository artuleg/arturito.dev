import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(menu: any) {
    this.router.navigateByUrl(menu.path);
    this.onNavigate.emit();
  }

  activeMenu(menu: any): boolean {
    return location.pathname.replace('/', '') === menu.path;
  }

}
