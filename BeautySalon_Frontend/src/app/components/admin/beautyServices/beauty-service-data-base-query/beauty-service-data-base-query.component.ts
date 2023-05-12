import { Component } from '@angular/core';
import {BeautyService, BeautyServiceColumns, BeautyServiceDetails} from "../../../../model/BeautyService";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {BeautyServiceService} from "../../../../services/beautyService/beauty-service.service";
import {Client} from "../../../../model/Client";

@Component({
  selector: 'app-beauty-service-data-base-query',
  templateUrl: './beauty-service-data-base-query.component.html',
  styleUrls: ['./beauty-service-data-base-query.component.css']
})
export class BeautyServiceDataBaseQueryComponent {
  displayedColumns: string[] = BeautyServiceColumns.map((col) => col.key)
  columnsSchema: any = BeautyServiceColumns
  dataSource = new MatTableDataSource<BeautyService>()
  dataSourceDetails = new MatTableDataSource<BeautyServiceDetails>()
  valid: any = {}
  queryMethod: string = "";
  queryParam: string = "";
  id: number = 0;
  loyaltyPoints: number = 0;
  queryEmployeeType = "";

  constructor(public dialog: MatDialog, private beautyServiceService: BeautyServiceService) {}

  ngOnInit(): void {
    this.beautyServiceService.getAllBeautyServices().subscribe((res: any) => {
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
      this.beautyServiceService.getBeautyServiceById(this.id).subscribe((foundBeautyService : BeautyService) => this.dataSource.data = [foundBeautyService])
    }

    if(this.queryMethod === "findByName") {
      this.beautyServiceService.getBeautyServiceByName(this.queryParam).subscribe((foundBeautyService : BeautyService) => this.dataSource.data = [foundBeautyService])
    }

    if(this.queryMethod === "findByEmployeeType") {
      this.beautyServiceService.getBeautyServiceByEmployeeType(this.queryEmployeeType).subscribe((foundBeautyServices : BeautyService[]) => this.dataSource.data = foundBeautyServices)
    }

    if(this.queryMethod === "findAll") {
      this.beautyServiceService.getAllBeautyServices().subscribe((foundBeautyServices : BeautyService[]) => this.dataSource.data = foundBeautyServices)
    }


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
