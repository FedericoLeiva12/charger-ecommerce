import React, {useState} from 'react'
import {SvgIcon} from '@material-ui/core';
import Style from '../productCard/style.css'
import ico from '../img/icono_i.png'
import carrito from '../img/carrito_icon.png';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';



export default function ProductCard({imagen = 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80', titulo='CAMPERA', precio='$9999'}) {
  const [active, setActive] = useState('')

  function handleClick(e){
    const clicked = e.target.id || e.target.className
      if(active === clicked) { 
          setActive('');
      } else {
          setActive(clicked)
     }
  }

  return (
    <div className="wrapper">
  <div className="container">
    <img src={imagen} alt='product' className='top'/>
    <div className={`bottom ${active === 'first'? ' clicked': ''}` } >
      <div className="left">
        <div className="details">
          <h1>{titulo}</h1>
          <p>{precio} </p>
          </div>
        <div className='buy' onClick={handleClick} id='first'> <img className='first' src={carrito} alt='carrito' onClick={handleClick}/> </div>
      </div>
      <div className="right">
        <div className="done"><SvgIcon component={DoneIcon} style={{fontSize:60, paddingLeft:15, paddingTop:10 }} /></div>
        <div className="details">
          <h1>{titulo} </h1>
          <p>Added to your cart</p>
        </div>
        <div className={`remove ${active === 'second'? ' clicked': ''}` } onClick={handleClick} id='second'><SvgIcon component={ClearIcon} style={{fontSize:60, paddingLeft:15, paddingTop:10 }}/></div>
      </div>
    </div>
  </div>
  <div className="inside">
    <div className="icon" ><i className="material-icons" > <img id='ico' src={ico} alt='info' /> </i></div>
    <div className="contents"> ejemplo </div>
  </div>
</div>
  )
}


