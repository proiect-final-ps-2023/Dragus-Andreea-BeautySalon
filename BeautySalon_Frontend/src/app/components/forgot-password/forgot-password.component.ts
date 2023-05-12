import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userName: string = "";

  constructor(private userService: UserService, private router: Router) {
  }

  submitRecoverPassword() {
   this.userService.recoverPassword(this.userName).subscribe((res:any) => {
     alert("Email sent")
   }, error => {
     alert("Username not found")
   })
   this.router.navigateByUrl('/login')
  }


  ngOnInit(): void {
  }


}
