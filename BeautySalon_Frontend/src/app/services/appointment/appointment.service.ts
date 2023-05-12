import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "../../model/Appointment";
import {AppointmentBooking} from "../../model/AppointmentBooking";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseURL: string = "http://localhost:8080/appointment";
  constructor(private httpClient: HttpClient) { }

  getAllAppointments() {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Appointment[]>(this.baseURL + "/getAll", {headers:header});
  }

  getAppointmentById(id: number|string): Observable<Appointment> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    let params = new HttpParams().set('id', id);
    return this.httpClient.get<Appointment>(this.baseURL + "/getById", {params: params, headers:header})
  }

  getAppointmentByEmployeeNameAndDateTime(name: string, dateTime: string): Observable<Appointment> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.get<Appointment>(this.baseURL + "/getByEmployeeAndDateTime?name=" + name + "&dateTime=" + dateTime, {headers:header} );
  }

  getAppointmentByClientNameAndDateTime(name: string, dateTime: string): Observable<Appointment> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Appointment>(this.baseURL + "/getByClientAndDateTime?name=" + name + "&dateTime=" + dateTime, {headers:header})
  }

  getAllByEmployee(name: String) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.get<Appointment[]>(this.baseURL + "/getAllByEmployeeName?name=" + name,{headers:header});
  }

  getAllByClient(name: String) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.get<Appointment[]>(this.baseURL + "/getAllByClientName?name=" + name, {headers:header});
  }

  getAllByBeautyServicesContaining(beautyServiceId: number) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    let params = new HttpParams().set('beautyServiceId', beautyServiceId);
    return this.httpClient.get<Appointment[]>(this.baseURL + "/getAllByBeautyServicesContaining", {params: params, headers:header});
  }

  getAllByTotalPriceGreaterThan(totalPrice: number) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.get<Appointment[]>(this.baseURL + "/getAllByTotalPriceGreaterThan?totalPrice=" + totalPrice, {headers:header});
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.post<Appointment>(this.baseURL + "/add", appointment, {headers: header});
  }

  addAppointmentBooking(appointmentBooking: AppointmentBooking) : Observable<AppointmentBooking> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.post<AppointmentBooking>(this.baseURL + "/add", appointmentBooking, {headers: header});
  }

  getAppointmentAsXML(id: number):Observable<Appointment> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.get<Appointment>(this.baseURL + "/getAppointmentXML?id=" + id, {headers:header});
  }

  updateAppointment(appointment: Appointment): Observable<Appointment>  {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.put<Appointment>(this.baseURL + "/update", appointment, {headers:header});
  }

  deleteAppointment(id: number): Observable<Appointment> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    return this.httpClient.delete<Appointment>(this.baseURL + "/delete?id=" + id, {headers:header});
  }
}
