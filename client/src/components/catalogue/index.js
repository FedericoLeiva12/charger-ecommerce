import React from 'react'
import Container from './Container'
import Selector from './Selector'

export default function Catalogo(){
    return(
        <div>
            <div>
                <span>
                    <Selector/>
                </span>
                <span>
                    <Selector/>
                </span>
            </div>
            <div>
                <Container></Container>
            </div>
        </div>
    )
}