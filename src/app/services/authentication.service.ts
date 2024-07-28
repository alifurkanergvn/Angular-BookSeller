import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";


const API_URL = `${environment.BASE_URL}/api/authentication/`; //Java ile aynı path olmalı

/*
    Kimlik doğrulama servicesinden backend e bağlanacağız ve ardından oturum açma veya kaydolma isteklerini göndereceğiz
    ancak her şeyden önce sunucuya bağlanmak için bir sunucu URL sine ihtiyacımız  var. Bunu doğrudan service sınıfında
    tanımlayabiliriz ancak bu iyi bir seçim olmayacaktır.
    Çünkü her hizmet hizmet sınıfı için URL yi tekrar tekrar tanımlamamız gerekecektir.
    Bunu belirtmek için angular environment ortam değişkenleri sağlar.
    Bunları orada tanımlayıp global olarak kullanabiliriz.
    Ayrıca development ve production ortamları için URL leri ayrı ayrı kullanabiliriz.
 */

//@Injectable, bu sınıfın dependency Injection olarak diğer componentlarda kullanılabileceğini belirtir.
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      //currentUser anahtarıyla ilgili bir veri varsa, bu dize JSON formatından bir JavaScript nesnesine dönüştürülür
      storageUser = JSON.parse(storageUserAsStr);
    }
    this.currentUserSubject = new BehaviorSubject<User>(storageUser); // RxJS kütüphanesinden gelen ve gözlemlenebilir (observable) bir veri akışını temsil eden bir sınıftır
    this.currentUser = this.currentUserSubject.asObservable(); //Bu sayede, currentUser abonelik yapılarak kullanıcı verileri dinlenebilir.
}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //Login olmak için backendte post isteği api/authentication/sign-in  pathi kullanılıyor
  //user nesnesi form data olarak gönderilecek. Http yanıtı yakalamak için pipe kullandık  yanıtı işlemek için map operatörünü kullandık
  login(user: User): Observable<any> {
    return this.http.post<any>(API_URL + 'sign-in', user).pipe(
      map(response => {
        if (response) {
          //login işleminden gelen yanıt varsa onu localStorage olarak set'liyoruz
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response); //next metodunu çağırarak yeni kullanıcı verilerini yayınlar. Bu, abonelik yapan tüm bileşenlerin yeni veriyi almasını sağlar.
        }
        return response;
      })
    );
  }

  // api/authentication/sign-up pathine post isteği atıp yanıtı döndürür
  register(user: User): Observable<any> {
    return this.http.post(API_URL + 'sign-up', user);
  }

  //Session tutmadığımız için sadece current user ı siliyoruz
  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }


}
