import { Dispatch } from "redux";
import { IBody } from "../Reducer/excelReducer";

export enum ExcelActionType {
  HEADER = "header",
  BODY = "body",
  CLEAR = "CLEAR",
}

export interface BodyAction {
  type: string;
  payload: IBody[];
}

export interface HeaderAction {
  type: string;
  payload: string[];
}

export interface PurgeExcelAction {
  type: string;
  payload: null;
}

export type TotalActionType = HeaderAction | BodyAction | PurgeExcelAction;

export const headerDispatch = (value: string[]) => {
  return (dispatch: Dispatch) => {
    dispatch<HeaderAction>({
      type: ExcelActionType.HEADER,
      payload: value,
    });
  };
};

export const bodyDispatch = (value: IBody[]) => {
  return (dispatch: Dispatch) => {
    dispatch<BodyAction>({
      type: ExcelActionType.BODY,
      payload: value,
    });
  };
};

export const clearDispatch = () => {
  return (dispatch: Dispatch) => {
    dispatch<PurgeExcelAction>({
      type: ExcelActionType.CLEAR,
      payload: null,
    });
  };
};
