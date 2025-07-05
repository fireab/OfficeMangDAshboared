export interface EmployeeInterface {
  id: number;
  amharic_name: string;
  oromic_name: string;
  english_name: string;
  oromic_position: string;
  english_position: string;
  path: string;
  position: string;
  office: string;
  createdAt: string;
  updatedAt: string;
  created_date: string;
  updated_date: string;
}
export interface RateInterface {
  id: number;
  CustomerService: string;
  StandardService: string;
  FairService: string;
  ResponseForCompliment: string;
  ServiceRate: string;
  EmployeeId: number;
  year: number;
  name: string;
  phone: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  employee: EmployeeInterface;
}
