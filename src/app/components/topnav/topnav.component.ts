import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: '/topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  @Input()
  userEmail: string;

  @Input()
  isLoggedIn: boolean;

  constructor (
    private as: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLoggedOut(event) {
    event.preventDefault();
    this.isLoggedIn = false;
    this.as.logout();
    window.location.reload();
  }

}
