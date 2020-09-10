import React from 'react';
import Login from '../components/LoginPage/loginCard'
import Style from './loginPage.module.css'

const imgBG = '/home/juancho/Desktop/ecommerce/ecommerce-ft04-g3/client/src/assets/imgs/photoblurredLogIn.png'

const backgroundImageStyle = {
  height: '100vh',
  background: `url(${imgBG})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: '0% 50%',
  padding: '0px',
  margin: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

function loginPage() {
  return (
    <div className={Style.imgBG}>
      <Login />
    </div>
  )
}

export default loginPage
