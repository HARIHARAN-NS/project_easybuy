import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ElectroCartService } from 'src/app/electronicstore.service';
import { AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit {
  url: string = '';
  userName: string = '';
  constructor(
    private eservice: ElectroCartService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    if (this.eservice.getAdminName() !== null) {
      this.userName = this.eservice.getAdminName();
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: any) => {
        this.url = event?.url;
      });
  }

  routerToLink(link: string): void {
    if (link === '/admin/logout') {
      this.eservice.customerLogout();
      return;
    }
    this.router.navigate([link]);
  }
}
