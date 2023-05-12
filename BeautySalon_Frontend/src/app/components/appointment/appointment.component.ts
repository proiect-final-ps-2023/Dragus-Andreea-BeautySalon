import { Component } from '@angular/core';
import {Client} from "../../model/Client";
import {Appointment, AppointmentColumns, AppointmentDetails} from "../../model/Appointment";
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "../../model/Employee";
import {DataSharingService} from "../../services/dataSharing/data-sharing.service";
import {AppointmentService} from "../../services/appointment/appointment.service";
import jwt_decode from "jwt-decode";
import {EmployeeService} from "../../services/employee/employee.service";
import {BeautyService} from "../../model/BeautyService";
import {BeautyServiceService} from "../../services/beautyService/beauty-service.service";
import {ClientService} from "../../services/client/client.service";
import {AppointmentBooking} from "../../model/AppointmentBooking";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  clientData: Client | undefined
  clientSearch: Client = new Client();

  displayedColumns: string[] = AppointmentColumns.map((col) => col.key)
  columnsSchema: any = AppointmentColumns
  dataSource = new MatTableDataSource<Appointment>()
  dataSourceDetails = new MatTableDataSource<AppointmentDetails>()
  valid: any = {}
  queryMethod: string = "";
  queryParam: string = "";
  queryParam2: string = "";
  id: number = 0;

  dateTime: string = "";
  clientName: string = "";

  dateTimeOut: string = "";

  employee: Employee | undefined;
  client: Client | undefined;


  employees: string[] = [""];


  appointmentsByEmployee: Appointment[] = [];

  validHours: string[] = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00'];

  employeeOccupiedHours: string[] = [];
  employeeFreeHours: string[] = this.validHours;
  cntOccupied: number = 0;

  date: string = ""
  hour: string = ""
  selectedDateTime:string = ""

  beautyServicesAndPrices: string[] = []
  beautyServices1:string[] = []
  beautyServices2: string[] = []
  beautyServices3: string[] = []
  showBeautyService2: boolean = false;
  showBeautyService3: boolean = false;


  beautyServiceName1: string = ""
  beautyServiceName2: string = ""
  beautyServiceName3: string = ""

  beautyServiceApp1: BeautyService = new BeautyService()
  beautyServiceApp2: BeautyService = new BeautyService()
  beautyServiceApp3: BeautyService = new BeautyService()


  totalPrice: number = 0;

  employeeName: string = ""


  saleCode: string = ""
  validCode: boolean = false;
  invalidCode: boolean = false;

  checkedXML: boolean = false;

  constructor(private dataSharingService: DataSharingService, private appointmentService: AppointmentService,
              private employeeService: EmployeeService, private beautyServiceService: BeautyServiceService,
              private clientService: ClientService) {

  }


  ngOnInit(): void {

    this.dataSharingService.loginClient$.subscribe(data => {
      this.clientData = data;
      console.log(data);
      this.clientName = data.name as string
    })


    var savedToken: any;
    savedToken = localStorage.getItem('tokenLogin')
    var tokenPayload: any;
    tokenPayload = jwt_decode(savedToken);
    this.clientName = tokenPayload.name;
    console.log(this.clientName)

    this.appointmentService.getAllByClient(this.clientName).subscribe((res: any) => {
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

  changeEmployeeType(query: string) {
    this.queryMethod = query;

    this.employeeService.getEmployeesByEmployeeType(this.queryMethod).subscribe( (res: any) =>
    {
      for(let i = 0; i < res.length; i++) {
        this.employees[i] = res[i].name;
      }

    })

    this.beautyServiceService.getBeautyServiceByEmployeeType(this.queryMethod).subscribe((res:any) =>
    {
      for(let i = 0; i < res.length; i++) {
        this.beautyServicesAndPrices[i] = res[i].name + ', ' + 'price: ' + res[i].price
      }
    })

    this.beautyServices1 = this.beautyServicesAndPrices
    this.beautyServices2 = this.beautyServicesAndPrices
    this.beautyServices3 = this.beautyServicesAndPrices
  }

  changeEmployee(query:string) {
    this.queryMethod = query;
    this.employeeName = query;

    this.appointmentService.getAllByEmployee(this.queryMethod).subscribe((res:any) => {
      this.appointmentsByEmployee = res;

    })

    let savedToken: any;
    savedToken = localStorage.getItem('tokenLogin')
    let tokenPayload: any;
    tokenPayload = jwt_decode(savedToken);
    this.id = tokenPayload.id;

    this.clientService.getClientById(this.id).subscribe((res: Client) => {
      this.client = res
    })

    this.employeeService.getEmployeeByName(this.employeeName).subscribe((res: Employee) => {
      this.employee = res

    })
  }

  changeDate(){
    let d = (new Date(this.date))
    this.date = (new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString()).toString().substring(0,10)

    for(let i = 0; i < this.appointmentsByEmployee.length; i++) {
      let dateTime = this.appointmentsByEmployee[i].dateTime;
      let dateApp = dateTime?.substring(0,10);
      let timeApp = dateTime?.substring(11);

      if(dateApp == this.date) {
        this.employeeFreeHours = this.employeeFreeHours.filter((hour:string) => {return hour != timeApp})

      }
    }
  }

  changeHour(hour:string) {
    this.selectedDateTime = this.date + ' ' + hour

  }

  selectBeautyService1(beautyService: string) {
    this.beautyServices2 = this.beautyServicesAndPrices.filter((beautyServiceAndPrice: string) => {return beautyServiceAndPrice != beautyService})
    this.showBeautyService2 = true;
    this.beautyServiceName1 = beautyService.split(',')[0]

    this.beautyServiceService.getBeautyServiceByName(this.beautyServiceName1).subscribe((res:any) => {
      this.beautyServiceApp1 = res;

    })


  }

  selectBeautyService2(beautyService: string) {
    this.beautyServices3 = this.beautyServices2.filter((beautyServiceAndPrice: string) => {return beautyServiceAndPrice != beautyService})
    this.showBeautyService3 = true;
    this.beautyServiceName2 = beautyService.split(',')[0]


    this.beautyServiceService.getBeautyServiceByName(this.beautyServiceName2).subscribe((res:any) => {
      this.beautyServiceApp2 = res;

    })

  }

  selectBeautyService3(beautyService: string) {
    this.beautyServiceName3 = beautyService.split(',')[0]

    this.beautyServiceService.getBeautyServiceByName(this.beautyServiceName3).subscribe((res:any) => {
      this.beautyServiceApp3 = res;

    })

  }

  checkSaleCode() {
    this.clientService.getClientByName(this.clientName).subscribe((res: Client) => {
      if(res.salesCode == this.saleCode && res.salesCode != "") {
        this.validCode = true;
        this.invalidCode = false;
      } else
      {
        this.invalidCode = true;
        this.validCode = false;
      }
    })
  }

  bookAppointment() {

    let beautyServices: BeautyService[] = []
    let cntBeautyServices: number = 0;

    if(this.beautyServiceApp1.name != "") {
      beautyServices[cntBeautyServices++] = this.beautyServiceApp1;
    }

    if(this.beautyServiceApp2.name != "") {
      beautyServices[cntBeautyServices++] = this.beautyServiceApp2;
    }

    if(this.beautyServiceApp3.name != "") {
      beautyServices[cntBeautyServices++] = this.beautyServiceApp3;
    }

    let totalPrice: number = 0;
    for(let i = 0; i<beautyServices.length; i++) {
      totalPrice += beautyServices[i].price;
    }

    let appointmentBooking: AppointmentBooking = new AppointmentBooking()
    appointmentBooking.dateTime = this.selectedDateTime
    appointmentBooking.clientDTO = this.client
    appointmentBooking.employeeDTO = this.employee
    appointmentBooking.beautyServicesDTO = beautyServices
    appointmentBooking.totalPrice = totalPrice

    if(this.validCode) {
      appointmentBooking.totalPrice = totalPrice - 0.2*totalPrice;
    }

    console.log(appointmentBooking)

    this.appointmentService.addAppointmentBooking(appointmentBooking).subscribe((res:any) => {
      console.log(res)
      if(this.checkedXML) {
        this.appointmentService.getAppointmentAsXML(res.id).subscribe((res: any) => {
          console.log(res)
        })
      }
    })


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

    if (this.queryMethod === "findByClientNameAndDateTime") {
      this.appointmentService.getAppointmentByClientNameAndDateTime(this.clientName, this.modifyDateTimeFormat()).subscribe((foundAppointment: any) => {
        foundAppointment['client'] = foundAppointment.clientDTO;
        foundAppointment['employee'] = foundAppointment.employeeDTO;
        this.dataSource.data = [foundAppointment]
      })

    }

    if (this.queryMethod === "findAllByClient") {
      this.appointmentService.getAllByClient(this.clientName).subscribe((foundAppointments: any[]) => {
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


}
