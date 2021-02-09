import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public users=[
    {username:'admin', password:'1234', roles:['ADMIN', 'USER']},
    {username:'sylla', password:'1234', roles:['USER']},
    {username:'camara', password:'1234', roles:['USER']}
  ];
  public isAuthenticated:boolean | any;
  public userAuthenticated:any;
  public token:string | any;

  constructor() { }

  public login(username: string, password: string){
    let user=undefined;
    this.users.forEach(u=>{
      if(u.username == username && u.password==password){
        user = u;
        this.token = btoa(JSON.stringify({username: u.username,roles: u.roles}));
      }
    });
    if (user){
      this.isAuthenticated= true;   
      this.userAuthenticated = user;
    }else{
      this.isAuthenticated= false;   
      this.userAuthenticated = undefined;
    }
  }

  //contextualisation
  public isAdmin(){
    if(this.userAuthenticated){
      if(this.userAuthenticated.roles.indexOf('ADMIN')>-1){
        return true;
      }
    }
    return false;
  }
  public saveAuthenticatedUser(){
    if(this.userAuthenticated){
      localStorage.setItem('authToken', this.token);
    }
  }
  public loadAuthenticatedUserFormLocalStorage(){
    let t = localStorage.getItem('authToken');
    if(t){
      let user=JSON.parse(atob(t));
      console.log(user)
      this.userAuthenticated={username:user.username, roles:user.roles};
      console.log(this.userAuthenticated)
      this.isAuthenticated =true;
      this.token=t;
    }
  }

  public removeTokenFormLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.token = undefined;
    this.userAuthenticated = undefined;
  }
}
