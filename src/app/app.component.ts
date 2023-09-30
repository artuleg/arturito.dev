import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter, interval, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { DialogConnectComponent } from './shared/dialog-connect/dialog-connect.component';
import { SwUpdate } from '@angular/service-worker';
import { DialogUpdateComponent } from './shared/dialog-update/dialog-update.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'arturo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: []
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  public sidenav!: MatSidenav;

  @ViewChild(MatSidenavContent)
  public content!: MatSidenavContent;

  @ViewChild('menuSlide') menuSlide!: ElementRef<HTMLDivElement>;
  
  menuOpened = true;
  menuMode: MatDrawerMode = 'side';

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private updates: SwUpdate,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (updates.isEnabled && isPlatformBrowser(this.platformId)) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
      this.checkForUpdates();
      updates.checkForUpdate().then();
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => this.dialog.open(DialogUpdateComponent)); 
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http.post<{totalVisits: number, showedPopup: boolean}>(`${environment.api}/visitor`, null).subscribe(res => {
        if (res.totalVisits > 10 && !res.showedPopup) {
          const dialogRef = this.dialog.open(DialogConnectComponent);

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.router.navigate(['social']);
            }
          });
        }
      });

      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      if (width <= 750) {
        this.menuOpened = false;
        this.menuMode = 'over';
      }
    }
    this.toggleCursor();
    this.activateCursor();

    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(e => this.content.scrollTo({ top: 0, behavior: 'smooth' }))
    ).subscribe();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const hammertime = new (window as any).Hammer(this.menuSlide.nativeElement, {});
      hammertime.on('panright', () => {
          this.sidenav.open();
          this.menuOpened = true;
      });
      hammertime.on('panleft', () => {
          this.sidenav.close();
          this.menuOpened = false;
      });
    }
  }

  activateCursor(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cursor: any = document.getElementById('cursor');
      document.body.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
    }
  }

  toggleCursor() {
    if (isPlatformBrowser(this.platformId)) {
      const cursor: HTMLElement | any = document.getElementById('cursor');
      if ((<any> navigator).userAgentData.mobile === false) {
        cursor.className = 'cursor';
      } else {
        cursor.className = '';
      }
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
    if (isPlatformBrowser(this.platformId)) {
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

  routeChat() {
    if (isPlatformBrowser(this.platformId)) {
      return location.href.includes('/chat');
    }

    return false;
  }
}
