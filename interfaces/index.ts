import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IPatient} from '../src/interfaces';

export interface IDepartment {
  _id: string;
  name: string;
  numberOfBeds: number;
  type: string;
  createdAt: string;
}

export interface IBed {
  _id: string;
  bedNumber: string;
  departmentId: string;
  createdAt: string;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface INavigationProp {
  navigation: NativeStackNavigationProp<any>;
  route?: RouteProp<any>;
}

export interface IDepartmentReducer {
  departments: IDepartment[];
  isLoading: boolean;
}

export type GraphOptionsType = '7days' | '14days' | 'Monthly' | 'Yearly';
export interface ITestResultsReducer {
  patientTestResults: ITestResult[];
  patientGraphResults: IGraphTestResults;
  nurseGraphResults: IGraphTestResults;
  nurseTestResults: ITestResult[];
  selectedOption: GraphOptionsType;
  isLoading: boolean;
}

export interface IBedReducer {
  beds: IBed[];
  isLoading: boolean;
}

export interface IPatientReducer {
  patients: IPatient[];
  isLoading: boolean;
}

export enum TEST_TYPES_ENUM {
  BLOOD_SUGAR = 'Blood Sugar',
  URIC_ACID = 'Uric Acid',
}

export interface ITestResult {
  _id: string;
  nurseId: string | null;
  patientId: string;
  testType: TEST_TYPES_ENUM;
  hexCode: string;
  testValue: number;
  createdAt: string;
}

export interface IGraphTestResults {
  data: number[];
  labels: string[];
}

export interface TestJourneyReducer {
  selectedPatient: IPatient | undefined;
  testType: TEST_TYPES_ENUM | undefined;
}

export enum USER_ROLES_ENUM {
  ADMIN = 'admin',
  NURSE = 'nurse',
  USER = 'user',
}
