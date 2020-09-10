import React from 'react';
import Login from '../components/LoginPage/loginCard'
import Style from './loginPage.module.css'

function loginPage() {
  return (
    <div className={Style.imgBG}>
      <Login />
    </div>
  )
}

export default loginPage
