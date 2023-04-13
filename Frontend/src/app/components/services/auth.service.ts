import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hotelname: string = 'NAME'
  private readonly apiUrl = 'http://localhost:8080'
  private readonly HOTEL_TOKEN = 'HOTEL_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser = '';
  public isadmin = false;

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + '/loginhotel', user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
    }));
  }

  logout(): any {
    return this.http.post<any>(this.apiUrl + '/logout', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn(): any {
    return !!this.getJwtToken();
  }

  refreshToken(): any {
    return this.http.post<any>(this.apiUrl + '/refresh', {
      'refreshToken': this.getRefreshToken(),
      'accessToken': this.getJwtToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  isAdmin(): void {
    if (this.isLoggedIn()) {
      const httpHeaders = new HttpHeaders({
        Authorisation: '' + this.getJwtToken()
      });
      this.http.get(this.apiUrl + '/authorised', { headers: httpHeaders }).subscribe((result) => {
        if (result) {
          this.isadmin = true
        }
        else {
          this.isadmin = false
        }
      })
    }
    else {
      this.isadmin = false
    }
  }

  getJwtToken(): any {
    return localStorage.getItem(this.HOTEL_TOKEN);
  }

  gethotelname(): any {
    return localStorage.getItem('HOTELNAME')
  }

  private doLoginUser(username: string, tokens: Tokens): void {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }
  

  private doLogoutUser(): void {
    this.loggedUser = '';
    this.removeTokens();
  }

  private getRefreshToken(): any {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string): void{
    localStorage.setItem(this.HOTEL_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens): void {
    if (tokens.jwt !== undefined && tokens.refreshToken !== undefined) {
      localStorage.setItem(this.HOTEL_TOKEN, tokens.jwt);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
      localStorage.setItem('HOTELNAME', tokens.hotelname);
    }
    else {
      alert('INVALID CREDENTIALS')
    }
  }

  private removeTokens(): void {
    localStorage.removeItem(this.HOTEL_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem('HOTELNAME')
  }
}
