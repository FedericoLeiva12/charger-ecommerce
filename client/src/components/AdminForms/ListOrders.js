import {Grid} from '@material-ui/core';
import React, { useEffect } from 'react';
import OrdersTable from '../OrdersTable/';

function ListOrders({allOrders, getAllOrders, modifyOrdersState}) {

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <div style={{ background: '#3d3d3d', padding: '10px'}}>
      <Grid container justify='center'>
          <OrdersTable allOrders={allOrders} getAllOrders={getAllOrders} modifyOrdersState={modifyOrdersState}/>
      </Grid>
    </div>
  )
}

export default  ListOrders;
