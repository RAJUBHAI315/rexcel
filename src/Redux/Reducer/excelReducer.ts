import { ExcelActionType, TotalActionType } from "../Action/excelAction";
import { PURGE } from "redux-persist";

export interface IBody {
  SNO: Number;
  FIRSTNAME: string;
  LASTNAME: string;
  AGE: number;
  TELEPHONE: number;
}

export interface IExcelState {
  header: string[];
  body: IBody[];
}

const initialState: IExcelState = {
  header: [],
  body: [],
};

export const excelReducer = (state = initialState, action: TotalActionType) => {
  switch (action.type) {
    case ExcelActionType.HEADER:
      return { ...state, header: action.payload };
    case ExcelActionType.BODY:
      return { ...state, body: action.payload };
    case ExcelActionType.CLEAR:
      return initialState;
    default:
      return state;
  }
};
