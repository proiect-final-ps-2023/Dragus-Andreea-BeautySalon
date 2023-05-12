import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Employee} from "../../model/Employee";
import {User} from "../../model/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseURL: string = "http://localhost:8080/employee";
  constructor(private httpClient: HttpClient) { }

  getAllEmployees() {
    /*
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
      */
    return this.httpClient.get<Employee[]>(this.baseURL + "/getAll", );
  }

  getEmployeeById(id: number): Observable<Employee> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    let params = new HttpParams().set('id', id);
    return this.httpClient.get<Employee>(this.baseURL + "/getById", {params: params, headers:header})
  }

  getEmployeeByName(name: string): Observable<Employee> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Employee>(this.baseURL + "/getByName?name=" + name, {headers:header});
  }

  getEmployeeByUserName(userName: string): Observable<Employee> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Employee>(this.baseURL + "/getByUserName?userName=" + userName, {headers:header});
  }

  getEmployeesByEmployeeType(employeeType: string) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.get<Employee[]>(this.baseURL + "/getByEmployeeType?employeeType=" + employeeType, {headers:header});
  }

  addEmployee(employee: Employee): Observable<Employee> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.post<Employee>(this.baseURL + "/add", employee, {headers:header});
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.put<Employee>(this.baseURL + "/update", employee,{headers:header});
  }

  deleteEmployee(id: number): Observable<Employee> {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)
    return this.httpClient.delete<Employee>(this.baseURL + "/delete?id=" + id, {headers:header});
  }

  logout(employeeName: string): Observable<string> {
    localStorage.setItem("tokenLogin", "")
    return this.httpClient.put<string>(this.baseURL + "/logOut", employeeName);
  }
}
