import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../../model/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseURL: string = "http://localhost:8080/client";
  constructor(private httpClient: HttpClient) { }

  getAllClients() {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Client[]>(this.baseURL + "/getAll", {headers: header});
  }

  getClientById(id: number): Observable<Client> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    let params = new HttpParams().set('id', id);
    return this.httpClient.get<Client>(this.baseURL + "/getById", {params: params, headers: header})
  }

  getClientByName(name: string): Observable<Client> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Client>(this.baseURL + "/getByName?name=" + name, {headers:header});
  }

  getClientByUserName(userName: string): Observable<Client> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Client>(this.baseURL + "/getByUserName?userName=" + userName, {headers:header});
  }

  getAllClientsByLoyaltyPointsGreaterThan(loyaltyPoints: number) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Client[]>(this.baseURL + "/getAllByLoyaltyPointsGreaterThan?loyaltyPoints="+ loyaltyPoints,{headers:header});
  }
    /*
  registerClient(client: Client): Observable<string> {
    return this.httpClient.post<Client>(this.baseURL + "/add", client);
  }
  */

  addClient(client: Client): Observable<Client> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.post<Client>(this.baseURL + "/add", client, {headers:header});
  }

  updateClient(client: Client): Observable<Client> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.put<Client>(this.baseURL + "/update", client, {headers:header});
  }

  deleteClient(id: number): Observable<Client> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.delete<Client>(this.baseURL + "/delete?id=" + id, {headers:header});
  }

  logout(clientName: string): Observable<string> {
    //localStorage.setItem("tokenLogin", "")
    console.log("fac logout")
    return this.httpClient.put<string>(this.baseURL + "/logOut", clientName);
  }
}
