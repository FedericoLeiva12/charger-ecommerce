import React, {useState} from 'react'

import {SvgIcon} from '@material-ui/core';
import Style from '../productCard/style.module.css'
import carrito from '../../assets/imgs/carrito_icon.png';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from 'react-router-dom';



export default function ProductCard(props) {
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
    
    <div className={Style.wrapper}>
  <div className={Style.container}>
  <Link to={`/product/${props.prenda.id}`}>
    <img src={props.prenda.imagen} alt='product' className={Style.top}/>
  </Link>
    <div className={`${Style.bottom} ${active === Style.first ? Style.clicked: ''}` } >
      <div className={Style.left}>
        <div className={Style.details}>
          <h1>{props.prenda.titulo}</h1>
          <p>${props.prenda.precio} </p>
          </div>
        <div className={Style.buy} onClick={handleClick} id='first'> <img className={Style.first} src={carrito} alt='carrito' onClick={handleClick}/> </div>
      </div>
      <div className={Style.right}>
        <div className={Style.done}><SvgIcon component={DoneIcon} style={{fontSize:60, paddingLeft:15, paddingTop:10 }} /></div>
        <div className={Style.details}>
          <h1>{props.prenda.titulo} </h1>
          <p>Added to your cart</p>
        </div>
        <div className={`${Style.remove} ${active === Style.second ? Style.clicked : ''}`} onClick={handleClick} id='second'><SvgIcon component={ClearIcon} style={{fontSize:60, paddingLeft:15, paddingTop:10 }}/></div>
      </div>
    </div>
  </div>
  <div className={Style.inside}>
    <div className={Style.icon} > <SvgIcon component={InfoOutlinedIcon} /> </div>
    <div className={Style.contents}> 
    <table>
        <tr>
          <th>Talle</th>
          <th>Color</th>
        </tr>
        <tr>
          <td>S</td>
          <td>Amarillo</td>
        </tr>
        <tr>
          <th>M</th>
          <th>Negro</th>
        </tr>
        <tr>
          <td>L</td>
          <td>Verde</td>
        </tr>
        <tr>
          <th>XL</th>
          <th>Rojo</th>
        </tr>
        <tr>
          <td>XXL</td>
          <td>Blanco</td>
        </tr>
      </table>
     </div>
  </div>
</div> 
  )
}



