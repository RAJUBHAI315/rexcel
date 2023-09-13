import { ErrorActionType, ToastAction } from "../Action/toastAction";

export interface IToast {
  status: Boolean;
  value: string;
  close: boolean;
}

const initialState: IToast = {
  status: false,
  value: "",
  close: true,
};

export const toastReducer = (state = initialState, action: ToastAction) => {
  switch (action.type) {
    case ErrorActionType.failure:
      return { ...state, status: false, error: action.payload, close: false };
    case ErrorActionType.success:
      return { ...state, status: true, error: action.payload, close: false };
    case ErrorActionType.close:
      return { ...state, close: false };
    default:
      return { state };
  }
};
