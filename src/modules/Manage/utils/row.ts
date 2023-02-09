import {
  EXPECTED_COMPLETED,
  EXPECTED_UNCOMPLETED,
  STATUS_ACTIVE,
  STATUS_DEACTIVATE,
} from '../const';
import { Row } from './type';

export const timeTableRows: Row[] = [
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_ACTIVE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_ACTIVE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_ACTIVE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_DEACTIVATE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_UNCOMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_ACTIVE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_UNCOMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_DEACTIVATE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_DEACTIVATE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_UNCOMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_ACTIVE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_DEACTIVATE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_DEACTIVATE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_DEACTIVATE,
  },
  {
    email: 'abc@example.com',
    expected: EXPECTED_COMPLETED,
    fullName: 'Chien',
    shortName: 'Chien',
    status: STATUS_DEACTIVATE,
  },
];
