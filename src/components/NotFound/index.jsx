import React from 'react'
import { Link } from 'react-router-dom'
import pageNotFound from '../../assets/Images/pageNotFound.svg'
import { BackButton, Image, NotFoundContainer } from './NotFoundElements'

const NotFound = () => {
  return (
    <NotFoundContainer style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Image src={pageNotFound}/>
      <Link to='/'>
        <BackButton>Back to survey</BackButton>
      </Link>
    </NotFoundContainer>
  )
}

export default NotFound
