import { useLocation, Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import {
  failureDispatch,
  successDispatch,
} from "../../Redux/Action/toastAction";
import "../../pages/index.css";

const templateLink =
  "https://drive.google.com/uc?export=download&id=186yutnPEQvgFK5NlK7aNQO7ImPfEWvr_";

export const CustomNav = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const excelHead = useSelector((state: RootState) => state.excel);
  const header: string[] = excelHead["header"];

  const handleView = () => {
    if (header.length === 0) {
      dispatch(failureDispatch("Please Upload a File"));
    }
  };

  const homePath = () => {
    navigate("/");
  };

  const value: boolean = location.pathname === "/data";

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container fluid>
        <Nav>
          <Link to="/">
            <Nav.Link onClick={homePath} style={{ textDecoration: "none" }}>
              Home
            </Nav.Link>
          </Link>
          <Link to="/data">
            {value === true ? null : (
              <Nav.Link onClick={handleView}>View</Nav.Link>
            )}
          </Link>
        </Nav>
        <Nav>
          <a
            href={templateLink}
            className="btn btn-primary"
            download=" template.xlsx"
            role="button"
          >
            Download Template
          </a>
        </Nav>
      </Container>
    </Navbar>
  );
};
