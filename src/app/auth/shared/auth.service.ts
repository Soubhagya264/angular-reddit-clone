import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
// import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable, tap } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../login/login-response.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  

  
 
  constructor(private httpClient:HttpClient,  private localStorage: LocalStorageService) { }


  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map((data: { authenticationToken: any; username: any; refreshToken: any; expiresAt: any; }) => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        // this.loggedIn.emit(true);
        // this.username.emit(data.username);
        return true;
      }));
  }

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
    this.refreshTokenPayload)
    .pipe(tap((response) => {
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('expiresAt');

      this.localStorage.store('authenticationToken',
        response.authenticationToken);
      this.localStorage.store('expiresAt', response.expiresAt);
    }));
  }


 

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
