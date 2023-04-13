import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChefloginService {

  private CHEFNAME: string = 'NAME'
  private readonly apiUrl = 'http://localhost:8080'
  private readonly CHEF_TOKEN = 'CHEF_TOKEN';
  private readonly CHEF_R_TOKEN = 'CHEF_R_TOKEN';
  private loggedUser = '';
  public isadmin = false;

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + '/loginchef', user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          //alert("error while logging in"+ error.error);
          return of(false);
    }));
  }

  logout(): any {
    return this.http.post<any>(this.apiUrl + '/logoutchef', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        //alert("error in logging"+error.error);
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
    return localStorage.getItem(this.CHEF_TOKEN);
  }

  getCHEFNAME(): any {
    return localStorage.getItem('CHEFNAME')
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
    return localStorage.getItem(this.CHEF_R_TOKEN);
  }

  private storeJwtToken(jwt: string): void{
    localStorage.setItem(this.CHEF_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens): void {
    if (tokens.jwt !== undefined && tokens.refreshToken !== undefined) {
      localStorage.setItem(this.CHEF_TOKEN, tokens.jwt);
      localStorage.setItem(this.CHEF_R_TOKEN, tokens.refreshToken);
      localStorage.setItem('CHEFNAME', tokens.chefname);
    }
    else {
      alert('INVALID CREDENTIALS')
    }
  }

  private removeTokens(): void {
    localStorage.removeItem(this.CHEF_TOKEN);
    localStorage.removeItem(this.CHEF_R_TOKEN);
    localStorage.removeItem('CHEFNAME')
  }
}
