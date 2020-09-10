import React from 'react';
import CreateUser from '../components/LoginPage/createUser'
import Style from './createUserPage.module.css'


function CreateUserPage() {
  return (
    <div className={Style.imgBG}>
      <div>
      <CreateUser/>
      </div>
    </div>
  )
}

export default CreateUserPage
