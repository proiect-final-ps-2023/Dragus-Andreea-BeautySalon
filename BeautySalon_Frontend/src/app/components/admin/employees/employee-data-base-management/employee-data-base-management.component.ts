import {Component, OnInit} from '@angular/core';
import {Employee, EmployeeColumns, EmployeeDetails} from "../../../../model/Employee";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-data-base',
  templateUrl: './employee-data-base-management.component.html',
  styleUrls: ['./employee-data-base-management.component.css']
})
export class EmployeeDataBaseManagementComponent implements  OnInit{
  displayedColumns: string[] = EmployeeColumns.map((col) => col.key)
  columnsSchema: any = EmployeeColumns
  dataSource = new MatTableDataSource<Employee>()
  dataSourceDetails = new MatTableDataSource<EmployeeDetails>()
  valid: any = {}

  constructor(public dialog: MatDialog, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  transformEmployeeDetailsToEmployee(employeeDetails: EmployeeDetails): Employee {
    let employee: Employee = new Employee();
    employee.id = employeeDetails.id;
    employee.name = employeeDetails.name;
    employee.userType = employeeDetails.userType;
    employee.userName = employeeDetails.userName;
    employee.password = employeeDetails.password;
    employee.employeeType = employeeDetails.employeeType;
    employee.loggedIn = employeeDetails.loggedIn

    return employee;
  }

  editRow(row: EmployeeDetails) {
    console.log(row)

    if (row.id == undefined) {
      let employee: Employee = this.transformEmployeeDetailsToEmployee(row);

      this.employeeService.addEmployee(employee).subscribe((newEmployee: Employee) => {
        row.id = newEmployee.id
        row.isEdit = false
        row.isSelected = false;
      })
    } else {
      let employee: Employee = this.transformEmployeeDetailsToEmployee(row);
      this.employeeService.updateEmployee(employee).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: EmployeeDetails = {
      id:undefined,
      name : '',
      userName: '',
      password: '',
      userType:'',
      employeeType:'',
      loggedIn: false,
      isEdit: true,
      isSelected: true,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Employee) => u.id !== id,
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
