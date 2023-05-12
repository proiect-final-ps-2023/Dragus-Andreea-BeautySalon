export class Client {

  id: number | undefined;
  name: string | undefined;
  userType: string | undefined;
  userName: string | undefined;
  password: string | undefined;
  salesCode: string | undefined;
  loyaltyPoints: number = 0;
  loggedIn: boolean = false;

}

export interface ClientDetails {
  isSelected: boolean;
  id:number | undefined;
  name:string;
  userType: string;
  userName:string;
  password:string;
  salesCode: string | undefined;
  loyaltyPoints: number;
  loggedIn: boolean;
  isEdit:boolean;
}

export const ClientColumns = [
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
    key: 'userType',
    type: 'text',
    label: 'userType',
    required: true,
  },
  {
    key: 'name',
    type: 'text',
    label: 'name',
    required: true,
  },
  {
    key: 'userName',
    type: 'text',
    label: 'userName',
    required: true,
  },
  {
    key: 'password',
    type: 'text',
    label: 'password',
  },
  {
    key: 'salesCode',
    type: 'text',
    label: 'salesCode',
  },
  {
    key: 'loyaltyPoints',
    type: 'number',
    label: 'loyaltyPoints',
  },
  {
    key: 'loggedIn',
    type: 'boolean',
    label: 'loggedIn',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

