import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Employee} from "../../model/Employee";
import {Client} from "../../model/Client";

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private loginEmployee = new BehaviorSubject<Employee>({id:undefined, name:'', userName:'', employeeType:'', userType:'EMPLOYEE', password:'', loggedIn: false});
  loginEmployee$ = this.loginEmployee.asObservable();

  private loginClient = new BehaviorSubject<Client>({id:undefined, name:'', userName:'', userType:'CLIENT', password:'',salesCode:'', loyaltyPoints:0, loggedIn: false});
  loginClient$ = this.loginClient.asObservable();

  private announcements = new BehaviorSubject<string[]>([])
  announcements$ = this.announcements.asObservable();


  private logins = new BehaviorSubject<string[]>([])
  logins$ = this.logins.asObservable()

  constructor() { }

  updateLoginEmployee(loginEmployee: Employee) {
    this.loginEmployee.next(loginEmployee);
  }

  updateLoginClient(loginClient: Client) {
    this.loginClient.next(loginClient);
  }

  updateAnnouncements(announcements: string[]) {
    this.announcements.next(announcements)
  }

}
