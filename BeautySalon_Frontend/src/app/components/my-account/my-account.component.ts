import {Component, OnInit} from '@angular/core';
import jwt_decode from "jwt-decode";
import {UserService} from "../../services/user/user.service";
import {EmployeeService} from "../../services/employee/employee.service";
import {ClientService} from "../../services/client/client.service";
import {User} from "../../model/User";
import {Employee} from "../../model/Employee";
import {Client} from "../../model/Client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit{
  savedToken: any
  user: User = new User();
  employee: Employee = new Employee();
  client: Client = new Client();
  changePass: boolean = false;
  newPass: string = "";

  passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*\.]).{10,}$');
  validNewPass: boolean = false;

  constructor(private userService: UserService, private employeeService: EmployeeService, private clientService: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.savedToken = localStorage.getItem('tokenLogin')
    let tokenPayload: any;
    tokenPayload = jwt_decode(this.savedToken);
    const userType = tokenPayload.userType;
    const id = tokenPayload.id;

    this.userService.getUserById(id).subscribe((res:User) => {
      this.user = res;
    })

    if(userType=='EMPLOYEE') {
      this.employeeService.getEmployeeById(id).subscribe((res:Employee)=>{
        this.employee = res;
      })
    }

    if(userType=='CLIENT') {
      this.clientService.getClientById(id).subscribe((res:Client)=>{
        this.client = res;
      })
    }
  }

  submitUpdateDetails(){
    if(this.user.userType == 'CLIENT') {
      this.client.name = this.user.name;
      if(this.passwordRegex.test(<string>this.newPass) ) {
        this.client.password = this.newPass
        this.validNewPass = true;
      } else {
        alert("Invalid new password");
        this.validNewPass = false;
      }

      if(this.validNewPass) {
        this.clientService.updateClient(this.client).subscribe((res: Client) => {
          alert("Account updated successfully");
          this.router.navigateByUrl("/login")
        }, error => {
          alert("Could not update account: invalid data")
        })
      }
    }

    if(this.user.userType == 'EMPLOYEE') {
      this.employee.name = this.user.name;
      if(this.newPass != "" ) {
        this.employee.password = this.newPass
      }
      this.employeeService.updateEmployee(this.employee).subscribe((res:Employee) => {
        alert("Account updated successfully");
        this.router.navigateByUrl("/login")
      }, error => {
        alert("Could not update account: invalid data")
      })
    }

    if(this.user.userType == 'ADMIN') {
      if(this.newPass != "" ) {
        this.user.password = this.newPass
      }
      this.userService.updateUser(this.user).subscribe((res:User)=>{
        alert("Account updated successfully");
        this.router.navigateByUrl("/login")
      })
    }
  }

  changePassword(){
    this.changePass = true;
  }

}
