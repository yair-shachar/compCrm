import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isLoggedIn: boolean;
  userEmail: string;
  
constructor (
  private as: AuthService
) { }

  ngOnInit(): void { 
    this.as.getAuth().subscribe( auth => {
      
      if (auth) {
        this.isLoggedIn = true;
        this.userEmail = auth.email;
      }
    });
  }

}
