import React, {useState} from 'react'
import {SvgIcon} from '@material-ui/core';
import '../productCard/style.css'
import carrito from '../../assets/images/carrito_icon.png';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';



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
    <div className="icon" > <SvgIcon component={InfoOutlinedIcon} /> </div>
    <div className="contents"> 
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



