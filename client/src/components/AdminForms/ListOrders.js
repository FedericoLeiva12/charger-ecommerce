import {Grid} from '@material-ui/core';
import React, { useEffect } from 'react';
import OrdersTable from '../OrdersTable/';

function ListOrders({allOrders, getAllOrders}) {

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <div style={{height: '79.36vh', background: '#3d3d3d', padding: '16px'}}>
      <Grid container justify='center'>
          <OrdersTable allOrders={allOrders} getAllOrders={getAllOrders}/>
      </Grid>
    </div>
  )
}

export default  ListOrders;
