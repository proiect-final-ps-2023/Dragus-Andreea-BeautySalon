import {Component, OnInit} from '@angular/core';
import {Employee} from "../../model/Employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee/employee.service";

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.css']
})
export class EmployeeListPageComponent implements OnInit{
  employeesList:Employee[] = [];
  columnsToDisplay = ['id','name','employeeType'];
  updateForm:FormGroup | undefined;

  constructor(private employeeService: EmployeeService,
              private  formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(res =>{
        console.log(res);
        this.employeesList=res;
      },
      (_error: any)=>{

      });


    //this.initOwnerCarsForm();
  }


  initOwnerCarsForm(){
    this.updateForm=this.formBuilder.group({
      userInput:[null,Validators.required]
    })
  }

}
