import React from 'react'
import {Link} from 'react-router-dom'
import Style from '../pages/homePage.module.css'
import Container from '../components/NavBar/Container'


export default function HomePage() {

    return (
        <div className={Style.imageBg}>
            <Container />
            <div className={Style.title}>
                <h1>CHARGER</h1>
                <Link to='/catalogo' className={Style.linkCatalogo}>VIEW PRODUCTS</Link>
            </div>
        </div>
    )
}