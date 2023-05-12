import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Client} from "../../model/Client";
import {Observable} from "rxjs";
import {BeautyService} from "../../model/BeautyService";

@Injectable({
  providedIn: 'root'
})
export class BeautyServiceService {

  baseURL: string = "http://localhost:8080/beautyService";
  constructor(private httpClient: HttpClient) { }

  getAllBeautyServices() {
    //let auth_token = localStorage.getItem("tokenLogin")
   // let header = new HttpHeaders()
      //.set('Content-Type', 'application/json')
      //.set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<BeautyService[]>(this.baseURL + "/getAll");
  }

  getBeautyServiceById(id: number): Observable<BeautyService> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    let params = new HttpParams().set('id', id);
    return this.httpClient.get<BeautyService>(this.baseURL + "/getById", {params: params, headers: header})
  }

  getBeautyServiceByName(name: string): Observable<BeautyService> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<BeautyService>(this.baseURL + "/getByName?name=" + name, {headers:header});
  }

  getBeautyServiceByEmployeeType(employeeType: string): Observable<BeautyService[]> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<BeautyService[]>(this.baseURL + "/getByEmployeeType?employeeType=" + employeeType, {headers:header});
  }


  addBeautyService(beautyService: BeautyService): Observable<BeautyService> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.post<BeautyService>(this.baseURL + "/add", beautyService, {headers:header});
  }

  updateBeautyService(beautyService: BeautyService): Observable<BeautyService> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.put<BeautyService>(this.baseURL + "/update", beautyService, {headers:header});
  }

  deleteBeautyService(id: number): Observable<BeautyService> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.delete<BeautyService>(this.baseURL + "/delete?id=" + id, {headers:header});
  }
}
