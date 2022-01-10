import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "src/app/models/user.model"
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import * as moment from 'moment'

const baseUrl = 'http://localhost:5000/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>(baseUrl, { email, password })
    .pipe(tap((authenticatedUser: User) => this.setSession(authenticatedUser)))
    .pipe(shareReplay(1))
    .pipe(
      catchError(this.handleError<User>('login'))
    );
  }

  private setSession(authResult: User) {
    const expiresAt = moment().add(authResult.exp, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || '0');
    return moment(expiresAt);
  }
}
