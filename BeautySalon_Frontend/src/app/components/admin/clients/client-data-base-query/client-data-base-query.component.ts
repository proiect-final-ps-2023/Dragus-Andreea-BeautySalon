import {Component, OnInit} from '@angular/core';
import {Client, ClientColumns, ClientDetails} from "../../../../model/Client";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ClientService} from "../../../../services/client/client.service";
import {Employee} from "../../../../model/Employee";

@Component({
  selector: 'app-client-data-base-query',
  templateUrl: './client-data-base-query.component.html',
  styleUrls: ['./client-data-base-query.component.css']
})
export class ClientDataBaseQueryComponent implements OnInit{
  displayedColumns: string[] = ClientColumns.map((col) => col.key)
  columnsSchema: any = ClientColumns
  dataSource = new MatTableDataSource<Client>()
  dataSourceDetails = new MatTableDataSource<ClientDetails>()
  valid: any = {}
  queryMethod: string = "";
  queryParam: string = "";
  id: number = 0;
  loyaltyPoints: number = 0;

  constructor(public dialog: MatDialog, private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  changeQuery(query: string) {
    this.queryMethod = query;
  }


  queryUserDataBase() {
    if(this.queryMethod === "findById") {
      this.id = parseInt(this.queryParam);
      this.clientService.getClientById(this.id).subscribe((foundClient : Client) => this.dataSource.data = [foundClient])
    }

    if(this.queryMethod === "findByName") {
      this.clientService.getClientByName(this.queryParam).subscribe((foundClient : Client) => this.dataSource.data = [foundClient])
    }

    if(this.queryMethod === "findByUserName") {
      this.clientService.getClientByUserName(this.queryParam).subscribe((foundClient : Client) => this.dataSource.data = [foundClient])
    }

    if(this.queryMethod === "findAll") {
      this.clientService.getAllClients().subscribe((foundClients : Client[]) => this.dataSource.data = foundClients)
    }

    if(this.queryMethod === "findAllByLoyaltyPointsGreaterThan") {
      this.loyaltyPoints = parseInt(this.queryParam);
      this.clientService.getAllClientsByLoyaltyPointsGreaterThan(this.loyaltyPoints).subscribe((foundClients : Client[]) => this.dataSource.data = foundClients)
    }

  }

  transformClientDetailsToClient(clientDetalis: ClientDetails): Client {
    let client: Client = new Client();
    client.id = clientDetalis.id;
    client.name = clientDetalis.name;
    client.userType = clientDetalis.userType;
    client.userName = clientDetalis.userName;
    client.password = clientDetalis.password;
    client.loyaltyPoints = clientDetalis.loyaltyPoints;
    client.loggedIn = clientDetalis.loggedIn;

    return client;
  }

  editRow(row: ClientDetails) {
    console.log(row)

    if (row.id == undefined) {
      let client: Client = this.transformClientDetailsToClient(row);

      this.clientService.addClient(client).subscribe((newClient: Client) => {
        row.id = newClient.id
        row.isEdit = false
        row.isSelected = false;
      })
    } else {
      let client: Client = this.transformClientDetailsToClient(row);
      this.clientService.updateClient(client).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: ClientDetails = {
      id:undefined,
      name : '',
      userName: '',
      password: '',
      userType:'',
      salesCode:'',
      loyaltyPoints: 0,
      loggedIn: false,
      isEdit: true,
      isSelected: true,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.clientService.deleteClient(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Client) => u.id !== id,
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
