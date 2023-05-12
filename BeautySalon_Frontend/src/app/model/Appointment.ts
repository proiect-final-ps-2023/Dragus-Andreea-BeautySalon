import {Client} from "./Client";
import {Employee} from "./Employee";

export class Appointment {
  id: number | undefined;
  clientDTO: Client | undefined;
  employeeDTO: Employee | undefined;
  dateTime: string | undefined;
  totalPrice: number | undefined;
}

export interface AppointmentDetails {
  isSelected: boolean;
  id: number | undefined;
  clientDTO: Client | undefined;
  employeeDTO: Employee | undefined;
  dateTime: string | undefined;
  totalPrice: number | undefined;
  isEdit:boolean;

}

export const AppointmentColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'id',
    type: 'number',
    label: 'id',
    required: true,
  },
  {
    key: 'client',
    type: 'Client',
    label: 'client',
    required: true,
  },
  {
    key: 'employee',
    type: 'Employee',
    label: 'employee',
    required: true,
  },
  {
    key: 'dateTime',
    type: 'string',
    label: 'dateTime',
    required: true,
  },
  {
    key: 'totalPrice',
    type: 'number',
    label: 'totalPrice',
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
