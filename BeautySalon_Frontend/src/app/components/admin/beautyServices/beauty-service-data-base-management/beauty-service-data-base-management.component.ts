import {Component, OnInit} from '@angular/core';
import {User, UserColumns, UserDetails} from "../../../../model/User";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../../services/user/user.service";
import {BeautyService, BeautyServiceColumns, BeautyServiceDetails} from "../../../../model/BeautyService";
import {BeautyServiceService} from "../../../../services/beautyService/beauty-service.service";

@Component({
  selector: 'app-beauty-service-data-base-management',
  templateUrl: './beauty-service-data-base-management.component.html',
  styleUrls: ['./beauty-service-data-base-management.component.css']
})
export class BeautyServiceDataBaseManagementComponent implements OnInit{
  displayedColumns: string[] = BeautyServiceColumns.map((col) => col.key)
  columnsSchema: any = BeautyServiceColumns
  dataSource = new MatTableDataSource<BeautyService>()
  dataSourceDetails = new MatTableDataSource<BeautyServiceDetails>()
  valid: any = {}

  constructor(public dialog: MatDialog, private beautyServiceService: BeautyServiceService) {}

  ngOnInit(): void {
    this.beautyServiceService.getAllBeautyServices().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }
  transformBeautyServiceDetailsToBeautyService(beautyServiceDetails: BeautyServiceDetails): BeautyService {
    let beautyService: BeautyService = new BeautyService();
    beautyService.id = beautyServiceDetails.id;
    beautyService.name = beautyServiceDetails.name;
    beautyService.employeeType = beautyServiceDetails.employeeType;
    beautyService.price = beautyServiceDetails.price;

    return beautyService;
  }
  editRow(row: BeautyServiceDetails) {
    if (row.id == undefined) {
      let beautyService: BeautyService = this.transformBeautyServiceDetailsToBeautyService(row);

      this.beautyServiceService.addBeautyService(beautyService).subscribe((newBeautyService: BeautyService) => {
        row.id = newBeautyService.id
        console.log(newBeautyService);
        row.isEdit = false
        row.isSelected = false;
      })
    } else {
      let beautyService: BeautyService = this.transformBeautyServiceDetailsToBeautyService(row);
      this.beautyServiceService.updateBeautyService(beautyService).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: BeautyServiceDetails = {
      id:undefined,
      name : '',
      employeeType: '',
      price:0,

      isEdit: true,
      isSelected: true,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  addRowToDB(row: BeautyServiceDetails) {
    if (row.id === undefined) {
      let beautyService: BeautyService = this.transformBeautyServiceDetailsToBeautyService(row);

      this.beautyServiceService.addBeautyService(beautyService).subscribe((newBeautyService: BeautyService) => {
        row.id = newBeautyService.id
        row.isEdit = false
      })
    } else {
      let beautyService: BeautyService = this.transformBeautyServiceDetailsToBeautyService(row);
      this.beautyServiceService.updateBeautyService(beautyService).subscribe(() => (row.isEdit = false))
    }
  }

  removeRow(id: number) {
    this.beautyServiceService.deleteBeautyService(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: BeautyService) => u.id !== id,
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
