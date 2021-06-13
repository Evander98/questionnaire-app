import React, { useState, useEffect } from 'react'
import { RegisterContainer, RegisterBox, RegisterTitle, TextInput, RegisterButton } from './RegisterElemets'
import { urlAPI } from '../../assets/URLs'
import { useSelector, useDispatch } from 'react-redux'
import { ifError, loggedIn } from '../../actions/userAction'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Register = () => {
  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

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

  const onRegister = () => {
    if(fullName && email && password){
      axios.post(urlAPI + '/auth/register', {fullName, email, password})
      .then(res => {
        console.log(res.data)
        res.data.msg ? dispatch(ifError(res.data.msg)) : dispatch(loggedIn(res.data))
      })
      .catch(err => {
        console.log(err)
      })
    }else{
      Swal.fire(
        'Oops...',
        'Please fill in all the fields!',
        'error'
      )
    }
  }
  if(user.email){
    return <Redirect to='/'/>
  }
  return (
    <RegisterContainer>
      <RegisterBox>
        <RegisterTitle>Sign Up!</RegisterTitle>
        <TextInput type='text' placeholder='Full Name' value={fullName} onChange={e => setFullName(e.target.value)}/>
        <TextInput type='text' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <TextInput type='password' placeholder='Password' value={password} onKeyDown={(e) => e.code == 'Enter' ? onRegister() : null} onChange={e => setPassword(e.target.value)}/>
        <RegisterButton onClick={onRegister}>Register</RegisterButton>
      </RegisterBox>
    </RegisterContainer>
  )
}

export default Register
