import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Appointment, AppointmentColumns, AppointmentDetails} from "../../../../model/Appointment";
import {AppointmentService} from "../../../../services/appointment/appointment.service";

@Component({
  selector: 'app-appointment-data-base-management',
  templateUrl: './appointment-data-base-management.component.html',
  styleUrls: ['./appointment-data-base-management.component.css']
})
export class AppointmentDataBaseManagementComponent {
  displayedColumns: string[] = AppointmentColumns.map((col) => col.key)
  columnsSchema: any = AppointmentColumns
  dataSource = new MatTableDataSource<Appointment>()
  dataSourceDetails = new MatTableDataSource<AppointmentDetails>()
  valid: any = {}

  constructor(public dialog: MatDialog, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getAllAppointments().subscribe((res: any) => {
      for(let i = 0; i < res.length; i++) {
        res[i]['client'] = res[i].clientDTO;
        res[i]['employee'] = res[i].employeeDTO;
      }
      this.dataSource.data = res;
      console.log(this.dataSource.data);
    })
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
