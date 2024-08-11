import {Component} from '@angular/core';
import {User} from "./models/user.model";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "./models/role.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-book-seller';
  //Login işleminden sonra kullanıcı adını göstermek ve kullanıcı rolü bilmek için lazım
  currentUser: User = new User();

  constructor(private authenticationService:AuthenticationService, private router:Router) {
    //currentUser ı Observable olarak almalıyız çünkü currentUser'ın değeri değişir değişmez componentta onu yakalamak istiyoruz
    this.authenticationService.currentUser.subscribe(data=> {
      this.currentUser = data;
    })
  }

  // === hem veri tipi hem değerinin eşitliğini kontrol eder. Role admin ise true döner
  isAdmin(){
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut(){
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

}
