import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    //Aktif bir oturum kullanıcısı varsa kullanıcıyı profile sayfasına yönlendireceğiz.
    if (this.authenticationService.currentUserValue?.id){
      this.router.navigate(['/profile']);
      return;
    }
  }

  login(){
    this.authenticationService.login(this.user).subscribe(data => {
        this.router.navigate(['/profile']);
      }, error => {
      this.errorMessage = 'Username or password is incorrect.';
      console.log(error);
    })
  }

}
