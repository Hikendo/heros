import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/envioroments';
import { User } from '../interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl= environments.baseUrl;
  private user?: User;

  constructor(
    private http: HttpClient,
    private router:Router) { }
  get currentUser(): User | undefined{
    if(!this.user) return undefined;
    return structuredClone( this.user );
  }
  login( email:string, password: string ):Observable<User>{

    //Con el backend bien montado se usa un post
   return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user=> this.user=user ),
      tap( user=> localStorage.setItem('token','sadASD.FASFFAE.asd5165dsf') )
    );

  }
  checkAuthStatus():Observable<boolean>{
      if(!localStorage.getItem('token')) return of(false);

      const token = localStorage.getItem('token');
      return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user=user),
        map( user => !!user),
        catchError(e => of(false))
      )
  }
  logout(){
    this.user= undefined;
    localStorage.clear();
  }
}
