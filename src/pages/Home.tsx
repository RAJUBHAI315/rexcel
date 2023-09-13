import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { successDispatch, failureDispatch } from "../Redux/Action/toastAction";
import {
  bodyDispatch,
  headerDispatch,
  clearDispatch,
} from "../Redux/Action/excelAction";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import { IBody } from "../Redux/Reducer/excelReducer";
import { useEffect } from "react";
import "./index.css";

export const Home: React.FC = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      setIsFileUploaded(true); // Set the state to indicate a file has been uploaded
      parseFile(file);
    }
  };

  const location = useLocation();

  const handleClear = () => {
    dispatch(clearDispatch());
  };

  useEffect(() => {
    if (location.pathname === "/") {
      handleClear();
    }
  }, [location.pathname]);

  const parseFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the first sheet contains the data
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const range = worksheet["!ref"];

      const headers: string[] = [];
      if (range) {
        const [startCell, endCell] = range.split(":");
        const startColumn = XLSX.utils.decode_col(startCell.replace(/\d/g, ""));
        const endColumn = XLSX.utils.decode_col(endCell.replace(/\d/g, ""));

        for (let col = startColumn; col <= endColumn; col++) {
          const cell = XLSX.utils.encode_col(col) + "1";
          if (worksheet[cell]) {
            headers.push(worksheet[cell].v);
          }
        }
      }

      // Validate headers
      const expectedHeaders = [
        "SNO",
        "FIRSTNAME",
        "LASTNAME",
        "AGE",
        "TELEPHONE",
      ];
      if (!expectedHeaders.every((header) => headers.includes(header))) {
        // Dispatch an error message for wrong headers
        dispatch(failureDispatch("Wrong File Please download the template"));
        return;
      }

      dispatch(successDispatch("File Successfully Uploaded"));

      // Log the headers
      dispatch(headerDispatch(headers));

      // Convert the worksheet data to JSON
      const jsonData: IBody[] = XLSX.utils.sheet_to_json(worksheet) as IBody[];

      dispatch(bodyDispatch(jsonData));

      if (jsonData.length === 0) {
        dispatch(failureDispatch("Data is empty"));
      } else {
        navigate("/data");
      }

      const columnNames = Object.keys(jsonData[0] || {});
      console.log(columnNames);

      // Log the JSON data to the console
      console.log(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleView = () => {
    if (!isFileUploaded) {
      dispatch(successDispatch("Please Upload A File"));
    } else {
      navigate("/data");
    }
  };

  return (
    <>
      <div className="home-container d-flex flex-row justify-content-center align-items-center">
        <div className="upload-container d-flex flex-column">
          <input
            type="file"
            id="inputfile"
            accept=".xlsx , .csv"
            onChange={handleUpload}
            hidden
          />
          <label
            className="btn btn-primary px-5 py-3"
            role="button"
            htmlFor="inputfile"
          >
            UPLOAD
          </label>
        </div>
        <div className="view-clear-container"></div>
      </div>
    </>
  );
};
