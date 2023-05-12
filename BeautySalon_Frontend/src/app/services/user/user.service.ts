import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {User} from "../../model/User";
import {Observable} from "rxjs";
import {Employee} from "../../model/Employee";
import {Client} from "../../model/Client";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = "http://localhost:8080/user";
  authBaseURL: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) {

  }

  getAllUsers() {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<User[]>(this.baseURL + "/getAll",{headers: header});
  }

  getUserById(id: number): Observable<User> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.get<User>(this.baseURL + "/getById?id=" + id, {headers: header});
  }

  getUserByName(name: string) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<User>(this.baseURL + "/getByName?name=" + name, {headers:header});
  }

  getUserByUserName(userName: string) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<User>(this.baseURL + "/getByUserName?userName=" + userName, {headers:header});
  }

  getUserByUserNameAndPassword(userName: string, password: string) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<User>(this.baseURL + "/getByUserName?userName=" + userName+ "&password="+password, {headers:header});
  }

  login(username: any, password: any): Observable<User | Employee | Client> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<User|Employee|Client>('http://localhost:8080/user/login?userName=' + username +'&password=' + password, {headers:header});
  }


  authenticate(username: any, password: any) {

    const body = JSON.stringify({
      userName: username,
      password: password
    });

    return this.httpClient.post<string>(this.authBaseURL+ "/authenticate", body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }

  register(user: User): Observable<string> {
    /*
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
      */

    return this.httpClient.post<string>(this.authBaseURL + "/register", user);
  }

  registerEmployee(employee: Employee): Observable<string> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.post<string>(this.authBaseURL + "/register", employee, {headers: header});
  }

  addUser(user: User): Observable<User> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.post<User>(this.baseURL + "/add", user, {headers:header});
  }

  updateUser(user: User): Observable<User> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.put<User>(this.baseURL + "/update", user, {headers:header});
  }

  deleteUser(id: number): Observable<User> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.delete<User>(this.baseURL + "/delete?id=" + id, {headers:header});
  }

  recoverPassword(userName: string): Observable<User> {
    return this.httpClient.put<User>(this.baseURL+"/recoverPassword", userName);
  }

}
