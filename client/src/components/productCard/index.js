import React, {useState} from 'react'
import {Typography, Card} from '@material-ui/core';
import Style from '../productCard/style.css'
//import ico from '../img/icono_i.png'
//import carrito from '../img/carrito_icon.png';




export default function ProductCard(props) {
  const [active, setActive] = useState('')

  function handleClick(e){
    console.log(active)
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
    <img src={props.prenda.imagen} alt='product' className='top'/>
    <div className={`bottom ${active === 'first'? ' clicked': ''}` } >
      <div className="left">
        <div className="details">
          <h1>{props.prenda.titulo}</h1>
          <p>{props.prenda.precio} </p>
        </div>
        <div className='buy' onClick={handleClick} id='first'> {/*<img className='first' src={carrito} alt='carrito' onClick={handleClick}/>*/} </div>
      </div>
      <div className="right">
        <div className="done"><i className="material-icons">done</i></div>
        <div className="details">
          <h1>{props.prenda.titulo} </h1>
          <p>Added to your cart</p>
        </div>
        <div className={`remove ${active === 'second'? ' clicked': ''}` } onClick={handleClick} id='second'><i className="material-icons">clear</i></div>
      </div>
    </div>
  </div>
  <div className="inside">
    <div className="icon" ><i className="material-icons" > {/*<img id='ico' src={ico} alt='info' />*/} </i></div>
    <div className="contents"> ejemplo </div>
  </div>
</div>
  )
}


