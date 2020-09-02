import React from 'react';

function Product ({titulo, precio, imagen}){
    return (
    <div>
        <img src={imagen}></img>
        <h1>{titulo}</h1>
        <h2>{precio}</h2>

    </div>
    )
}
export default Product;