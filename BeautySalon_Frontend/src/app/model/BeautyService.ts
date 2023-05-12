export class BeautyService {
  id: number | undefined;
  name: string = "";
  price: number = 0;
  employeeType: string = "";
}

export interface BeautyServiceDetails {
  isSelected: boolean;
  id: number | undefined;
  name: string;
  price: number;
  employeeType: string;
  isEdit:boolean;
}

export const BeautyServiceColumns = [
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
    key: 'name',
    type: 'text',
    label: 'name',
    required: true,
  },
  {
    key: 'price',
    type: 'number',
    label: 'price',
    required: true,
  },
  {
    key: 'employeeType',
    type: 'text',
    label: 'employeeType',
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
