import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {UserService} from "../../services/user/user.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  users: User[] = []
  numOfClients: number = 0;
  numOfEmployees: number = 0;
  numOfAdmins: number = 0;
  chartOptions2: any
  chartOptions3: any

  numOfLogInClients: number = 0;
  numOfLogInEmployees: number = 0;
  numOfLogInAdmins: number = 0;

  numOfLogOutClients: number = 0;
  numOfLogOutEmployees: number = 0;
  numOfLogOutAdmins: number = 0;

  numOfLogInUsers: number = 0;
  numOfLogOutUsers: number = 0;

  constructor(private userService: UserService) {
  }
  chartOptions = {
    animationEnabled: true,
    title:{
      text: "Glam Haven login users statistics"
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: [
        { y: 28, name: "Employees" },
        { y: 10, name: "Clients" },
        { y: 20, name: "Admins" },
        { y: 15, name: "License" },
        { y: 23, name: "Facilities" },
        { y: 17, name: "Taxes" },
        { y: 12, name: "Insurance" }
      ]
    }]
  }



  ngOnInit(): void {

  }

  userStatistics(){
   this.numOfAdmins = 0;
   this.numOfClients = 0;
   this.numOfEmployees = 0;
    this.userService.getAllUsers().subscribe((res:any) => {
      this.users = res
      console.log(this.users.length)
      console.log(this.users)
      for(let i = 0; i<this.users.length;i++) {
        if(this.users[i].userType =='ADMIN') {
          this.numOfAdmins++;
        }

        if(this.users[i].userType =='CLIENT') {
          this.numOfClients++;
        }

        if(this.users[i].userType =='EMPLOYEE') {
          this.numOfEmployees++;
        }
      }

      this.chartOptions2 = {
        animationEnabled: true,
        title: {
          text: "Users statistics"
        },
        data: [{
          type: "doughnut",
          yValueFormatString: "#,###.##'%'",
          indexLabel: "{name}",
          dataPoints: [
            {y: this.numOfEmployees*100/this.users.length, name: "Employees"},
            {y: this.numOfClients*100/this.users.length, name: "Clients"},
            {y: this.numOfAdmins*100/this.users.length, name: "Admins"},

          ]
        }]
      }
    })

  }

  userLoginStatistics(){
    this.numOfLogInClients = 0;
    this.numOfLogInEmployees = 0;
    this.numOfLogInAdmins = 0;

    this.numOfLogOutClients = 0;
    this.numOfLogOutEmployees = 0;
    this.numOfLogOutAdmins = 0;

    this.userService.getAllUsers().subscribe((res:any) => {
      this.users = res;

      for(let i = 0; i<this.users.length;i++) {
        if(this.users[i].userType == 'EMPLOYEE') {
          if(this.users[i].loggedIn == true) {
            this.numOfLogInEmployees++;
          } else {
            this.numOfLogOutEmployees++;
          }
        }

        if(this.users[i].userType == 'CLIENT') {
          if(this.users[i].loggedIn == true) {
            this.numOfLogInClients++;
          } else {
            this.numOfLogOutClients++;
          }
        }

        if(this.users[i].userType == 'ADMIN') {
          if(this.users[i].loggedIn == true) {
            this.numOfLogInAdmins++;
          } else {
            this.numOfLogOutAdmins++;
          }
        }
      }

      this.numOfLogInUsers = this.numOfLogInAdmins + this.numOfLogInClients + this.numOfLogInEmployees;
      this.numOfLogOutUsers = this.numOfLogOutAdmins + this.numOfLogOutClients + this.numOfLogOutEmployees;

      this.chartOptions3 = {
        animationEnabled: true,
        title: {
          text: "Login statistics"
        },
        axisX: {
          labelAngle: -90
        },
        axisY: {
          title: "number of users"
        },
        axisY2: {
          title: ""
        },
        toolTip: {
          shared: true
        },
        legend:{
          cursor:"pointer",
          itemclick: function(e: any){
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            }
            else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
        data: [{
          type: "column",
          name: "Logged in",
          legendText: "Number of online users",
          showInLegend: true,
          dataPoints:[
            {label: "Clients", y: this.numOfLogInClients},
            {label: "Employees", y: this.numOfLogInEmployees},
            {label: "Admins", y: this.numOfLogInAdmins},
            {label: "Total", y: this.numOfLogInUsers},
          ]
        }, {
          type: "column",
          name: "Logged out",
          legendText: "Number of offline users",
          axisYType: "secondary",
          showInLegend: true,
          dataPoints:[
            {label: "Clients", y: this.numOfLogOutClients},
            {label: "Employees", y: this.numOfLogOutEmployees},
            {label: "Admins", y: this.numOfLogOutAdmins},
            {label: "Total", y: this.numOfLogOutUsers},
          ]
        }]
      }
    })

  }

}
