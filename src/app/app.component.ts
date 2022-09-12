import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { stepper } from './core/router-animations';

@Component({
  selector: 'arturo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: []
})
export class AppComponent implements OnInit {

  @ViewChild(MatSidenav)
  public sidenav!: MatSidenav;
  
  menuOpened = true;
  menuMode: MatDrawerMode = 'side';

  constructor(private http: HttpClient, elementRef: ElementRef, private cdRef: ChangeDetectorRef) {
    const hammertime = new (window as any).Hammer(elementRef.nativeElement, {});
    hammertime.on('panright', () => {
        this.sidenav.open();
        this.menuOpened = true;
    });
    hammertime.on('panleft', () => {
        this.sidenav.close();
        this.menuOpened = false;
    });
  }

  ngOnInit(): void {
    this.http.post(`${environment.api}/visitor`, null).subscribe();
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (width <= 750) {
      this.menuOpened = false;
      this.menuMode = 'over';
    }
    this.toggleCursor();
    this.activateCursor();
  }

  activateCursor(): void {
    const cursor: any = document.getElementById('cursor');
    document.body.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }

  toggleCursor() {
    const cursor: HTMLElement | any = document.getElementById('cursor');
    if ((<any> navigator).userAgentData.mobile === false) {
      cursor.className = 'cursor';
    } else {
      cursor.className = '';
    }
  }

  navigate() {
    if (this.menuMode == 'over') {
      this.sidenav.close();
      this.menuOpened = false;
    }
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    this.toggleCursor();
    if (width <= 750) {
      this.menuOpened = false;
      this.menuMode = 'over';
    } else {
      this.menuOpened = true;
      this.menuMode = 'side';
    }
  }
}
