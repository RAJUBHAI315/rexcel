import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Reducer/rootReducer";
import { closeDispatch, failureDispatch } from "../../Redux/Action/toastAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../Redux/store";
import "../../pages/index.css";

const CustomToast = () => {
  const toastState = useSelector((state: RootState) => state.tot);
  const dispatch = useDispatch<AppDispatch>();

  const closeToast = () => {
    dispatch(closeDispatch(true));
  };

  useEffect(() => {
    if (toastState["status"] === false) {
      toast.error(toastState["error"], {
        autoClose: 2000,
        onClose: closeToast,
        className: "floating-toast",
      });
    } else {
      toast.success(toastState["error"], {
        autoClose: 2000,
        onClose: closeToast,
        className: "floating-toast",
      });
    }
  });

  return null;
};

export default CustomToast;
