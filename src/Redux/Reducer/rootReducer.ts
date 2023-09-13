import { combineReducers } from "redux";
import { toastReducer } from "./toastReducer";
import { excelReducer } from "./excelReducer";

export const rootReducer = combineReducers({
  tot: toastReducer,
  excel: excelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
