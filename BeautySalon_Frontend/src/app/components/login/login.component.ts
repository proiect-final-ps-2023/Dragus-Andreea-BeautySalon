import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../model/User";
import {Router} from "@angular/router";
import {Employee} from "../../model/Employee";
import {Client} from "../../model/Client";
import {EmployeeService} from "../../services/employee/employee.service";
import {DataSharingService} from "../../services/dataSharing/data-sharing.service";
import jwt_decode from "jwt-decode";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 user: User = new User();
 employee: Employee = new Employee();
 client: Client = new Client();

 foundEmployeeDB: Employee = new Employee();
 foundClientDB: Client = new Client();
 foundAdminDB: User = new User()

  logins: string[] = []
  count_logins: number = 0;

 constructor( private userService: UserService,
              private employeeService: EmployeeService,
              private dataSharingService: DataSharingService,
              private router: Router) {

 }
  submitLogInForm(): void {
   this.userService
     .authenticate(this.user.userName, this.user.password)
     .subscribe((response: any) => {
       console.log(response.token)
       localStorage.setItem('tokenLogin', response.token);
       let savedToken: any;
       savedToken = localStorage.getItem('tokenLogin')
       console.log(savedToken.toString())
       let tokenPayload: any;
       tokenPayload = jwt_decode(savedToken);
       const userType = tokenPayload.userType;
       console.log(userType)
       const id = tokenPayload.id;
       const name = tokenPayload.name;
       console.log(id)


       if(userType === 'EMPLOYEE') {
         console.log('INTRU AICI')
         this.userService.getUserById(id).subscribe((userDB: User) => this.foundEmployeeDB = userDB as Employee)
         this.dataSharingService.updateLoginEmployee(this.foundEmployeeDB);

         this.router.navigate(['/employeeHomePage']);

       }

       if(userType === 'CLIENT') {
         //console.log('INTRU AICI')
         this.userService.getUserById(id).subscribe((userDB: User) => {this.foundClientDB = userDB as Client; console.log("LAMBDA"+ this.foundClientDB)} )
         //console.log("FOUNDCLIENT" + this.foundClientDB.name)
         this.dataSharingService.updateLoginClient(this.foundClientDB);

         this.router.navigate(['/clientHomePage']);

       }

       if(userType === 'ADMIN') {
         //console.log('INTRU AICI')
         this.userService.getUserById(id).subscribe((userDB: User) => this.foundAdminDB = userDB)
         //this.dataSharingService.updateLoginClient(this.foundClientDB);

         this.router.navigate(['/adminHomePage']);

       }

     })
  }


 /*
  submitLogInForm(): void {

    this.userService
      .login(
        this.user.userName,
        this.user.password
      )
      .subscribe(
        (foundUser: User | Employee | Client) => {
          if(foundUser.userType == "EMPLOYEE") {
            this.foundEmployeeDB = foundUser as Employee;
            this.dataSharingService.updateLoginEmployee(this.foundEmployeeDB);

            this.router.navigate(['/employeeHomePage']);

          }

          if(foundUser.userType == "CLIENT") {
            this.foundClientDB = foundUser as Client;
            this.dataSharingService.updateLoginClient(this.foundClientDB);

            this.router.navigate(['/clientHomePage']);
          }

          if(foundUser.userType == "ADMIN") {
            this.router.navigate(['/adminHomePage']);
          }


        },
        (err: Error) => {
          console.log(err);
        }
      );
  }
  */


  ngOnInit(): void {
  }





}
