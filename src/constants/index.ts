export const EXCEL_FILE_TYPES = {
  CSV_TYPE: '.csv',
  XLS_TYPE: 'application/vnd.ms-excel',
  XLSX_TYPE:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export enum SOLVER {
  ORTOOL = 1,
  CPLEX = 2,
  NGSAII = 3,
}

export enum STRATEGY {
  SCALARIZATION = 1,
  CONSTRAINT_PROGRAMMING = 2,
  COMPROMISED_PROGRAMMING = 3,
  PARETO_BASED = 4,
}

export enum DAY_SESSION {
  AM = 1,
  PM = 0,
}
