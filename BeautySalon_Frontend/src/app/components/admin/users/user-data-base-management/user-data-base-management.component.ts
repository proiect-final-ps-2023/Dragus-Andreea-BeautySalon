import {Component, OnInit} from '@angular/core';
import {User, UserColumns, UserDetails} from "../../../../model/User";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponentComponent} from "../../confirm-dialog-component/confirm-dialog-component.component";

@Component({
  selector: 'app-user-data-base-management',
  templateUrl: './user-data-base-management.component.html',
  styleUrls: ['./user-data-base-management.component.css']
})
export class UserDataBaseManagementComponent implements  OnInit{
  displayedColumns: string[] = UserColumns.map((col) => col.key)
  columnsSchema: any = UserColumns
  dataSource = new MatTableDataSource<User>()
  dataSourceDetails = new MatTableDataSource<UserDetails>()
  valid: any = {}

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }
  transformUserDetailsToUser(userDetails: UserDetails): User {
    let user: User = new User();
    user.id = userDetails.id;
    user.name = userDetails.name;
    user.userType = userDetails.userType;
    user.userName = userDetails.userName;
    user.password = userDetails.password;
    user.loggedIn = userDetails.loggedIn;

    return user;
  }
  editRow(row: UserDetails) {
    if (row.id == undefined) {
      let user: User = this.transformUserDetailsToUser(row);

      this.userService.addUser(user).subscribe((newUser: User) => {
        row.id = newUser.id
        row.isEdit = false
        row.isSelected = false;
      })
    } else {
      let user: User = this.transformUserDetailsToUser(row);
      this.userService.updateUser(user).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: UserDetails = {
      id:undefined,
      name : '',
      userName: '',
      password: '',
      userType:'',
      loggedIn: false,
      isEdit: true,
      isSelected: true,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  addRowToDB(row: UserDetails) {
    if (row.id === 0) {
      let user: User = this.transformUserDetailsToUser(row);

      this.userService.addUser(user).subscribe((newUser: User) => {
        row.id = newUser.id
        row.isEdit = false
      })
    } else {
      let user: User = this.transformUserDetailsToUser(row);
      this.userService.updateUser(user).subscribe(() => (row.isEdit = false))
    }
  }

  removeRow(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: User) => u.id !== id,
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
