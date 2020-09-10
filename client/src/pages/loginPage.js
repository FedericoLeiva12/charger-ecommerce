import React from 'react';
import Login from '../components/LoginPage/loginCard'

const backgroundImageStyle = {
  height: '100vh',
  backgroundImage: `url(https://images.unsplash.com/photo-1598539962077-e4185f37104f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: '0% 50%',
  padding: '0px',
  margin: '0px',
  display: 'flex',
  alignItems: 'center',
}

function loginPage() {
  return (
    <div style={backgroundImageStyle}>
      <Login />
    </div>
  )
}

export default loginPage
