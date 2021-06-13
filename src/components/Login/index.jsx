import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { ifError, loggedIn } from "../../actions/userAction";
import { urlAPI } from "../../assets/URLs";
import {
  LoginBox,
  LoginButton,
  LoginContainer,
  LoginTitle,
  TextInput,
} from "./LoginElements";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPasssword] = useState();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user.error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: user.error,
        confirmButtonText: 'OK'
      }).then(result => {
        if(result.isConfirmed){
          dispatch(ifError(''))
        }
      })
    }
  }, [user.error])

  const onLogin = () => {
    if (email && password) {
      axios
        .get(urlAPI + "/auth/login", { params: { email, password } })
        .then((res) => {
          res.data.msg
            ? dispatch(ifError(res.data.msg))
            : dispatch(loggedIn(res.data));
        })
        .catch((err) => {
          // dispatch(ifError(err))
          console.log(err);
        });
    } else {
      Swal.fire(
        "Oops...",
        "Please fill in all the fields!",
        "error"
      );
    }
  };

  if (user.fullName) {
    return <Redirect to="/" />;
  }
  return (
    <LoginContainer>
      <LoginBox>
        <LoginTitle>Sign In!</LoginTitle>
        <TextInput type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <TextInput type="password" placeholder="Password" value={password} onKeyDown={(e) => e.code == 'Enter' ? onLogin() : null} onChange={e => setPasssword(e.target.value)}/>
        <LoginButton type="button" onClick={onLogin}>
          Submit
        </LoginButton>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
