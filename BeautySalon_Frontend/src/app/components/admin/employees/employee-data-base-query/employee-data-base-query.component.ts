import {Component, OnInit} from '@angular/core';
import {User, UserColumns, UserDetails} from "../../../../model/User";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../../services/user/user.service";
import {Employee, EmployeeColumns, EmployeeDetails} from "../../../../model/Employee";
import {EmployeeService} from "../../../../services/employee/employee.service";

@Component({
  selector: 'app-employee-data-base-query',
  templateUrl: './employee-data-base-query.component.html',
  styleUrls: ['./employee-data-base-query.component.css']
})
export class EmployeeDataBaseQueryComponent implements OnInit{
  displayedColumns: string[] = EmployeeColumns.map((col) => col.key)
  columnsSchema: any = EmployeeColumns
  dataSource = new MatTableDataSource<Employee>()
  dataSourceDetails = new MatTableDataSource<EmployeeDetails>()
  valid: any = {}
  queryMethod: string = "";
  queryParam: string = "";
  id: number = 0;
  queryEmployeeType = "";

  constructor(public dialog: MatDialog, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  changeQuery(query: string) {
    this.queryMethod = query;
  }

  changeQueryEmployeeType(employeeType: string) {
    this.queryEmployeeType = employeeType;
  }

  queryUserDataBase() {
    if(this.queryMethod === "findById") {
      this.id = parseInt(this.queryParam);
      this.employeeService.getEmployeeById(this.id).subscribe((foundEmployee : Employee) => this.dataSource.data = [foundEmployee])
    }

    if(this.queryMethod === "findByName") {
      this.employeeService.getEmployeeByName(this.queryParam).subscribe((foundEmployee : Employee) => this.dataSource.data = [foundEmployee])
    }

    if(this.queryMethod === "findByUserName") {
      this.employeeService.getEmployeeByUserName(this.queryParam).subscribe((foundEmployee : Employee) => this.dataSource.data = [foundEmployee])
    }

    if(this.queryMethod === "findByEmployeeType") {
      this.employeeService.getEmployeesByEmployeeType(this.queryEmployeeType).subscribe((foundEmployees : Employee[]) => this.dataSource.data = foundEmployees)
    }

    if(this.queryMethod === "findAll") {
      this.employeeService.getAllEmployees().subscribe((foundEmployees : Employee[]) => this.dataSource.data = foundEmployees)
    }

  }
  transformEmployeeDetailsToEmployee(employeeDetails: EmployeeDetails): Employee {
    let employee: Employee = new Employee();
    employee.id = employeeDetails.id;
    employee.name = employeeDetails.name;
    employee.userType = employeeDetails.userType;
    employee.userName = employeeDetails.userName;
    employee.password = employeeDetails.password;
    employee.employeeType = employeeDetails.employeeType;
    employee.loggedIn = employeeDetails.loggedIn;

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
