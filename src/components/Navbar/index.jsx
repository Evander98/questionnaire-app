import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "../../actions/userAction";
import {
  LoginLogout,
  NavbarContainer,
  NavbarItemWrapper,
  NavButton,
} from "./NavbarElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <NavbarContainer>
      <NavbarItemWrapper>
        {window.location.pathname == "/" ? (
          <NavButton active>Survey</NavButton>
        ) : (
          <Link to="/">
            <NavButton>Survey</NavButton>
          </Link>
        )}
        {/* {user.fullName == "" ? null : window.location.pathname ==
          "/category" ? (
            <NavButton active>Category</NavButton>
        ) : (
            <Link to='/category'>
              <NavButton >Category</NavButton>
            </Link>
        )} */}
        {user.fullName == "" ? null : window.location.pathname ==
          "/calculation" ? (
            <NavButton active>Calculation</NavButton>
        ) : (
            <Link to='/calculation'>
              <NavButton >Calculation</NavButton>
            </Link>
        )}
        {window.location.pathname == "/result" ? (
          <NavButton active>Result</NavButton>
        ) : (
          <Link to="/result">
            <NavButton>Result</NavButton>
          </Link>
        )}
        {/* {user.fullName == "" ? null : window.location.pathname ==
          "/add-question" ? (
            <NavButton active>Question</NavButton>
        ) : (
            <Link to='/add-question'>
              <NavButton >Question</NavButton>
            </Link>
        )} */}
      </NavbarItemWrapper>
      {user.fullName == "" ? (
        window.location.pathname == "/login" ? (
            <NavButton active>
              Login <FontAwesomeIcon icon={faSignInAlt} />
            </NavButton>
        ) : (
          <Link to="/login">
            <LoginLogout>
              Login <FontAwesomeIcon icon={faSignInAlt} />
            </LoginLogout>
          </Link>
        )
      ) : (
        <LoginLogout onClick={() => dispatch(reset())}>
          Logout <FontAwesomeIcon icon={faSignOutAlt} />
        </LoginLogout>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
