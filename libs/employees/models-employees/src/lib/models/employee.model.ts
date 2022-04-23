import {CheckModel} from "./check.model";

export interface EmployeeModel {
  _id: string,
  firstName: string;
  lastName: string;
  avatar: string;
  workspace: string;
  lastCheck: CheckModel,
  allChecks: CheckModel[],
}
