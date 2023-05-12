import {Client} from "./Client";
import {Employee} from "./Employee";
import {BeautyService} from "./BeautyService";

export class AppointmentBooking {
  id: number | undefined;
  clientDTO: Client | undefined;
  employeeDTO: Employee | undefined;
  dateTime: string | undefined;
  beautyServicesDTO: BeautyService[] = [];
  totalPrice: number | undefined;
}
