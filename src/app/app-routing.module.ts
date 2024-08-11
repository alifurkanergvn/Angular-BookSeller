import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./guest/home/home.component";
import {LoginComponent} from "./guest/login/login.component";
import {RegisterComponent} from "./guest/register/register.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {AdminComponent} from "./admin/admin/admin.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {UnauthorizedComponent} from "./error/unauthorized/unauthorized.component";
import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./models/role.enum";

const routes: Routes = [

  // Direkt pathsiz girişteki yönlendirme
  //pathMatch: 'full': Yalnızca URL tamamen eşleştiğinde yönlendirme yapılır.
  // Angular'da pathMatch özelliğini belirtmezseniz, varsayılan olarak 'prefix' kabul edilir. Sıkıntı olur / asd şeklinde istek atarsan başta boşluk olduğu için direkt home a gider
  // path: Bu, URL yolunu belirler. Kullanıcı, /register yoluna gittiğinde bu yönlendirme kuralı tetiklenir.
  //component: RegisterComponent: Bu, belirtilen URL yoluna yönlendirme yapılırken gösterilecek bileşeni belirler. Kullanıcı /register yoluna gittiğinde RegisterComponent bileşeni yüklenir ve görüntülenir.

  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  //Sadece Admin veya user role sahip kimliği doğrulanmış kişiler
  { path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },

  { path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },

  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // Bilinmeyen path ile istek gelirse aşağıda 404 e yönlendirme işlemini yaptık
  constructor(private router: Router) {
    this.router.errorHandler = (error:any) => {
      this.router.navigate(['/404']);
    };
  }
}
