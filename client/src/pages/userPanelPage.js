import React, { useState, useEffect } from 'react';
import { Box, AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import TabPanel from '../components/TabPanel';
import UserCard from '../components/UserCard';
import NavBarContainer from '../components/NavBar/Container'
import OrderCard from '../components/orderCard';
import { getOrders } from '../store/actions';

const useStyle = makeStyles({
    content: {
        marginTop: '4em'
    },
    appbar: {
        backgroundColor: '#444'
    }
})

function UserPanelPage ({orders, getOrders, user}) {
    const [tab, setTab] = useState(0);

    const classes = useStyle();

    useEffect(() => {
        getOrders();
    }, []);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function handleChange(e, newValue) {
        setTab(newValue);
    }

    return (
        <><NavBarContainer noTransparent={true}/>
        <Box compoent="div" className={classes.content}>
            <AppBar className={classes.appbar} position="static">
                <Tabs value={tab} onChange={handleChange}>
                    <Tab label="Information" {...a11yProps(0)} />
                    <Tab label="Orders" {...a11yProps(1)} />
                    <Tab label="Account Settings" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            {/* USER INFORMATION */}
            <TabPanel value={tab} index={0}>
                {user && (<UserCard
                    name={`${user.name} ${user.lastName}`}
                    email={user.email}
                    address={user.address}/>)}
            </TabPanel>

            {/* ORDERS */}
            <TabPanel value={tab} index={1}>
                {orders.map(order => (
                    <OrderCard
                        id={order.id}
                        status={order.status}
                        products={order.products} />
                ))}
                {/* <OrderCard
                     id="332"
                     status="active"
                     products={[{
                         titulo: 'West Jean',
                         precio: 854,
                         cantidad: 2
                     },{
                         titulo: 'West Jean',
                         precio: 854,
                         cantidad: 2
                     },{
                         titulo: 'West Jean',
                         precio: 854,
                         cantidad: 2
                     },{
                         titulo: 'West Jean',
                         precio: 854,
                         cantidad: 2
                     }]}/> */}
            </TabPanel>

            {/* ACCOUNT SETTINGS */}
            <TabPanel value={tab} index={2}>
                Account Settings
            </TabPanel>
        </Box>
        </>
    )
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOrders: () => dispatch(getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanelPage);