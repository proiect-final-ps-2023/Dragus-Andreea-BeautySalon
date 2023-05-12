import {AfterContentInit, Component, Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Employee} from "../../../model/Employee";
import {User} from "../../../model/User";
import {LoginComponent} from "../../login/login.component";
import {DataSharingService} from "../../../services/dataSharing/data-sharing.service";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {Appointment, AppointmentColumns, AppointmentDetails} from "../../../model/Appointment";
import {MatTableDataSource} from "@angular/material/table";
import {Client} from "../../../model/Client";
import jwt_decode from "jwt-decode";
import {EmployeeService} from "../../../services/employee/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-home-page',
  templateUrl: './employee-home-page.component.html',
  styleUrls: ['./employee-home-page.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class EmployeeHomePageComponent implements OnInit {
  employeeData: Employee | undefined
  employeeSearch: Employee = new Employee();

  displayedColumns: string[] = AppointmentColumns.map((col) => col.key)
  columnsSchema: any = AppointmentColumns
  dataSource = new MatTableDataSource<Appointment>()
  dataSourceDetails = new MatTableDataSource<AppointmentDetails>()
  valid: any = {}
  queryMethod: string = "";
  queryParam: string = "";
  queryParam2: string = "";
  id: number = 0;

  employeeName: string = "";
  dateTime: string = "";
  clientName: string = "";

  dateTimeOut: string = "";

  employee: Employee | undefined;
  client: Client | undefined;


  constructor(private dataSharingService: DataSharingService, private appointmentService: AppointmentService, private employeeService: EmployeeService, private router: Router) {

  }


  ngOnInit(): void {
    this.dataSharingService.loginEmployee$.subscribe(data => {
      console.log(data);
      this.employeeData = data;
      this.employeeSearch = data
      this.employeeName = data.name as string
    })

    var savedToken: any;
    savedToken = localStorage.getItem('tokenLogin')
    var tokenPayload: any;
    tokenPayload = jwt_decode(savedToken);
    this.employeeName = tokenPayload.name;


    this.appointmentService.getAllByEmployee(this.employeeName).subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        res[i]['client'] = res[i].clientDTO;
        res[i]['employee'] = res[i].employeeDTO;
      }
      this.dataSource.data = res;
      console.log(this.dataSource.data);
    })

  }

  changeQuery(query: string) {
    this.queryMethod = query;
  }

  modifyDateTimeFormat(): string {
    const event = new Date(this.dateTime);
    event.setHours(event.getHours()+3);
    event.setSeconds(0);
    event.setMilliseconds(0);
    let jsonDate = event.toISOString();
    jsonDate = jsonDate.replace(".000Z", "");
    console.log(jsonDate);
    return jsonDate;

  }


  queryUserDataBase() {

    if (this.queryMethod === "findByEmployeeNameAndDateTime") {
      this.appointmentService.getAppointmentByEmployeeNameAndDateTime(this.employeeName, this.modifyDateTimeFormat()).subscribe((foundAppointment: any) => {
        foundAppointment['client'] = foundAppointment.clientDTO;
        foundAppointment['employee'] = foundAppointment.employeeDTO;
        this.dataSource.data = [foundAppointment]
      })

    }

    if (this.queryMethod === "findAllByEmployee") {
      this.appointmentService.getAllByEmployee(this.employeeName).subscribe((foundAppointments: any[]) => {
        for (let i = 0; i < foundAppointments.length; i++) {
          foundAppointments[i]['client'] = foundAppointments[i].clientDTO;
          foundAppointments[i]['employee'] = foundAppointments[i].employeeDTO;
        }
        this.dataSource.data = foundAppointments
      })
    }

  }

  transformAppointmentDetailsToAppointment(appointmentDetails: AppointmentDetails): Appointment {
    let appointment: Appointment = new Appointment();
    appointment.id = appointmentDetails.id;
    appointment.clientDTO = appointmentDetails.clientDTO;
    appointment.employeeDTO= appointmentDetails.employeeDTO;
    appointment.dateTime = appointmentDetails.dateTime;
    appointment.totalPrice = appointmentDetails.totalPrice;
    return appointment;
  }

  editRow(row: AppointmentDetails) {
    console.log(row)

    if (row.id == undefined) {
      let appointment: Appointment = this.transformAppointmentDetailsToAppointment(row);

      this.appointmentService.addAppointment(appointment).subscribe((newAppointment: Appointment) => {
        row.id = newAppointment.id
        row.isEdit = false
        row.isSelected = false;
      })
    } else {
      let appointment: Appointment = this.transformAppointmentDetailsToAppointment(row);
      this.appointmentService.updateAppointment(appointment).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: AppointmentDetails = {
      id:undefined,
      clientDTO:undefined,
      employeeDTO:undefined,
      dateTime:"",
      totalPrice:undefined,
      isEdit: true,
      isSelected: true,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Appointment) => u.id !== id,
      )
    })
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  logOut() {
    var savedToken: any;
    savedToken = localStorage.getItem('tokenLogin')
    var tokenPayload: any;
    tokenPayload = jwt_decode(savedToken);
    this.clientName = tokenPayload.name;

    this.employeeService.logout(this.employeeName).subscribe((res:String) => {
      console.log(res)
    })

    this.router.navigate(['/firstPage']);

  }


}
