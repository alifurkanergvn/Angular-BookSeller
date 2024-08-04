import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //User nesnesiyle form oluşturmak için ihtiyacımız var
  user: User = new User();
  //Register talebi servera giderken alınan hataların gösterimi için
  errorMessage: string = "";
  faUser = faUser;

  //Oturum açılmışsa register sayfası görtülenmesin = router inject edildi
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    //Aktif bir oturum kullanıcısı varsa kullanıcıyı profile sayfasına yönlendireceğiz.
    if (this.authenticationService.currentUserValue?.id){
      this.router.navigate(['/profile']);
      return;
    }
  }

  register(){
    this.authenticationService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
      },err => {
        if (err?.status === 409){
          this.errorMessage = "Username already exist";
        } else {
          this.errorMessage = "Unexpected error occured. Error is : " +err?.errorMessage;
          console.log(err);
        }

      }

    )
  }

}
