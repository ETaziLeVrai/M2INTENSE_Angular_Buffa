import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion des assignments';

  constructor(private authService:AuthService, private router:Router, private assignmentService: AssignmentsService) {}

  login() {
    if(!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }

  initBD() {
    this.assignmentService.peuplerBDAvecForkJoin();
  }
}
