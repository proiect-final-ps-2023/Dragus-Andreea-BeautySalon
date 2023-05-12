import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseURL: string = "http://localhost:8080/announcements";
  constructor(private httpClient: HttpClient) { }
  
  getAnnouncements(): Observable<string[]> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    
    return this.httpClient.get<string[]>(this.baseURL, {headers:header})
  }
}
