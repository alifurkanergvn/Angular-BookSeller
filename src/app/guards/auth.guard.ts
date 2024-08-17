import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from "../models/user.model";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private currentUser: User = new User();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    })
  }

  //canActivate=  belirli bir rotaya erişimi kontrol etmek ve buna izin verilip verilmeyeceğine karar vermektir.
  //route: ActivatedRouteSnapshot: Bu parametre, etkinleştirilmeye çalışılan route (rota) hakkında bilgi içerir. Örneğin, rota parametreleri, rota konfigürasyonu gibi bilgilere buradan erişilebilir.
  //state: RouterStateSnapshot: Bu parametre, rotanın mevcut durumunu içerir. Yani, kullanıcı hangi rotadan geliyor ve nereye gitmeye çalışıyor gibi bilgilere buradan ulaşılabilir.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //ilk otrum kullanıcısı var mı diye bak. Oturum açılmamışsa oturum açma sayfasına yönlendirilecek
    //Rotes lara rol kısıtlaması ekle. Hangi sayfa hangi role göre görüntülecek bil. Bunları AppRouting te tanımla
    if (this.currentUser) {
      if (route.data['roles']?.indexOf(this.currentUser.role) === -1) {
        this.router.navigate(['/401']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return true;
  }

}
