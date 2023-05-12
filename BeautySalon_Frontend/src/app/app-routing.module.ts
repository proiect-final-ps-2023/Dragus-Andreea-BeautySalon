import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPageComponent} from "./components/user-page/user-page.component";
import {FirstPageComponent} from "./components/first-page/first-page.component";
import {EmployeeListPageComponent} from "./components/employee-list-page/employee-list-page.component";
import {LoginComponent} from "./components/login/login.component";
import {EmployeeHomePageComponent} from "./components/employee/employee-home-page/employee-home-page.component";
import {AdminHomePageComponent} from "./components/admin/admin-home-page/admin-home-page.component";
import {EmployeeDataBaseManagementComponent} from "./components/admin/employees/employee-data-base-management/employee-data-base-management.component";
import {UserDataBaseManagementComponent} from "./components/admin/users/user-data-base-management/user-data-base-management.component";
import {UserDataBaseQueryComponent} from "./components/admin/users/user-data-base-query/user-data-base-query.component";
import {EmployeeDataBaseQueryComponent} from "./components/admin/employees/employee-data-base-query/employee-data-base-query.component";
import {ClientDataBaseManagementComponent} from "./components/admin/clients/client-data-base-management/client-data-base-management.component";
import {ClientDataBaseQueryComponent} from "./components/admin/clients/client-data-base-query/client-data-base-query.component";
import {RegisterComponent} from "./components/register/register.component";
import {AppointmentDataBaseManagementComponent} from "./components/admin/appointments/appointment-data-base-management/appointment-data-base-management.component";
import {
  AppointmentDataBaseQueryComponent
} from "./components/admin/appointments/appointment-data-base-query/appointment-data-base-query.component";
import {ClientHomePageComponent} from "./components/client/client-home-page/client-home-page.component";
import {
  BeautyServiceDataBaseManagementComponent
} from "./components/admin/beautyServices/beauty-service-data-base-management/beauty-service-data-base-management.component";
import {
  BeautyServiceDataBaseQueryComponent
} from "./components/admin/beautyServices/beauty-service-data-base-query/beauty-service-data-base-query.component";
import {AppointmentComponent} from "./components/appointment/appointment.component";
import {ChatComponent} from "./components/chat/chat/chat.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {MyAccountComponent} from "./components/my-account/my-account.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";


const routes: Routes = [
  {path:'users', component: UserPageComponent},
  {path:'firstPage', component: FirstPageComponent},
  {path:'employeeList', component: EmployeeListPageComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'employeeHomePage', component: EmployeeHomePageComponent},
  {path:'clientHomePage', component: ClientHomePageComponent},
  {path:'adminHomePage', component: AdminHomePageComponent},
  {path:'userDataBaseManagement', component: UserDataBaseManagementComponent},
  {path:'userDataBaseQuery', component: UserDataBaseQueryComponent},
  {path:'employeeDataBaseManagement', component: EmployeeDataBaseManagementComponent},
  {path:'employeeDataBaseQuery', component: EmployeeDataBaseQueryComponent},
  {path:'clientDataBaseManagement', component: ClientDataBaseManagementComponent},
  {path:'clientDataBaseQuery', component: ClientDataBaseQueryComponent},
  {path:'appointmentDataBaseManagement', component: AppointmentDataBaseManagementComponent},
  {path:'appointmentDataBaseQuery', component: AppointmentDataBaseQueryComponent},
  {path:'beautyServiceDataBaseManagement', component: BeautyServiceDataBaseManagementComponent},
  {path:'beautyServiceDataBaseQuery', component: BeautyServiceDataBaseQueryComponent},
  {path:'bookAppointment', component: AppointmentComponent},
  {path:'chat', component:ChatComponent},
  {path:'forgotPassword', component:ForgotPasswordComponent},
  {path:'myAccount', component:MyAccountComponent},
  {path:'dash', component:AdminDashboardComponent},
  {path: '**', redirectTo: 'firstPage'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
