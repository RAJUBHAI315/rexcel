import { Dispatch } from "@reduxjs/toolkit";

export enum ErrorActionType {
  success = "success",
  failure = "failure",
  close = "close",
}

export interface ActionSuccess {
  type: string;
  payload: string;
}

export interface ActionFailure {
  type: string;
  payload: string;
}

export interface ActionClose {
  type: string;
  payload: boolean;
}

export type ToastAction = ActionFailure | ActionSuccess | ActionClose;

export const successDispatch = (value: string) => {
  return (dispatch: Dispatch) => {
    dispatch<ActionSuccess>({
      type: ErrorActionType.success,
      payload: value,
    });
  };
};

export const failureDispatch = (value: string) => {
  return (dispatch: Dispatch) => {
    dispatch<ActionFailure>({
      type: ErrorActionType.failure,
      payload: value,
    });
  };
};

export const closeDispatch = (value: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch<ActionClose>({
      type: ErrorActionType.failure,
      payload: value,
    });
  };
};
