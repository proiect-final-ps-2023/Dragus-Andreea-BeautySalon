import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { EmployeeListPageComponent } from './components/employee-list-page/employee-list-page.component';
import {MatTableModule} from "@angular/material/table";
import { LoginComponent } from './components/login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { EmployeeHomePageComponent } from './components/employee/employee-home-page/employee-home-page.component';
import { AdminHomePageComponent } from './components/admin/admin-home-page/admin-home-page.component';
import { EmployeeDataBaseManagementComponent } from './components/admin/employees/employee-data-base-management/employee-data-base-management.component';
import { UserDataBaseManagementComponent } from './components/admin/users/user-data-base-management/user-data-base-management.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import { ConfirmDialogComponentComponent } from './components/admin/confirm-dialog-component/confirm-dialog-component.component';
import { UserDataBaseQueryComponent } from './components/admin/users/user-data-base-query/user-data-base-query.component';
import {MatSelectModule} from "@angular/material/select";
import { EmployeeDataBaseQueryComponent } from './components/admin/employees/employee-data-base-query/employee-data-base-query.component';
import { ClientDataBaseManagementComponent } from './components/admin/clients/client-data-base-management/client-data-base-management.component';
import {ClientDataBaseQueryComponent} from "./components/admin/clients/client-data-base-query/client-data-base-query.component";
import { RegisterComponent } from './components/register/register.component';
import { AppointmentDataBaseManagementComponent } from './components/admin/appointments/appointment-data-base-management/appointment-data-base-management.component';
import {
  AppointmentDataBaseQueryComponent
} from "./components/admin/appointments/appointment-data-base-query/appointment-data-base-query.component";
import {MatNativeDateModule} from "@angular/material/core";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import { ClientHomePageComponent } from './components/client/client-home-page/client-home-page.component';
import { BeautyServiceDataBaseManagementComponent } from './components/admin/beautyServices/beauty-service-data-base-management/beauty-service-data-base-management.component';
import { BeautyServiceDataBaseQueryComponent } from './components/admin/beautyServices/beauty-service-data-base-query/beauty-service-data-base-query.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {DatePipe} from "@angular/common";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import * as CanvasJSAngularChart from './components/admin-dashboard/canvas-jschart/canvas-jschart.component';
import {CanvasJSChartComponent} from "./components/admin-dashboard/canvas-jschart/canvas-jschart.component";
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChartComponent;

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    FirstPageComponent,
    EmployeeListPageComponent,
    LoginComponent,
    EmployeeHomePageComponent,
    AdminHomePageComponent,
    EmployeeDataBaseManagementComponent,
    UserDataBaseManagementComponent,
    ConfirmDialogComponentComponent,
    UserDataBaseQueryComponent,
    EmployeeDataBaseQueryComponent,
    ClientDataBaseManagementComponent,
    ClientDataBaseQueryComponent,
    RegisterComponent,
    AppointmentDataBaseManagementComponent,
    AppointmentDataBaseQueryComponent,
    ClientHomePageComponent,
    BeautyServiceDataBaseManagementComponent,
    BeautyServiceDataBaseQueryComponent,
    AppointmentComponent,
    ChatComponent,
    ForgotPasswordComponent,
    MyAccountComponent,
    AdminDashboardComponent,
    CanvasJSChartComponent
  ],
  imports: [
    MbscModule,
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule
  ],
  providers: [MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
