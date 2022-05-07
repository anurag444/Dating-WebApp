import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5022/api/';
  private currentUserSource = new ReplaySubject<User>(1); //Buffer object, whenenver a subscriber subscribe to this observable, it will emit the last stored value
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }

  login(model: any){
    //save the user dto got the response into local browser storage
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }


  logout(){
    //remove the item from the local storage when we logout
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
