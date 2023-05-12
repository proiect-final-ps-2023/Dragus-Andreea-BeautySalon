import {Component, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  usersList:User[] = [];
  columnsToDisplay = ['id', 'name', 'userName', 'userType'];
  updateForm:FormGroup | undefined;

  constructor(private userService: UserService,
              private  formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res)=>{
        console.log(res);
        this.usersList=res;
      },
      (_error: any)=>{

      });

    this.userService.getUserById(1).subscribe();
    this.userService.getUserByName("Andreea Dragus").subscribe();

    this.initOwnerCarsForm();
  }

  initOwnerCarsForm(){
    this.updateForm=this.formBuilder.group({
      userInput:[null,Validators.required]
    })
  }
}
