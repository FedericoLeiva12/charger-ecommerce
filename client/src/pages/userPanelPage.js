import React, { useState } from 'react';
import { Box, AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import TabPanel from '../components/TabPanel';
import UserCard from '../components/UserCard';
import NavBarContainer from '../components/NavBar/Container'
import OrderCard from '../components/orderCard';

const useStyle = makeStyles({
    content: {
        marginTop: '4em'
    },
    appbar: {
        backgroundColor: '#444'
    }
})

function UserPanelPage () {
    const [tab, setTab] = useState(0);

    const classes = useStyle();

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
                <UserCard
                    name="Federico Julian Leiva"
                    email="federicoleivap@gmail.com"
                    birth="12/28/2001"
                    address="A. Sastre 1487, Lomas de Zamora, Llavallol (1836)"/>
            </TabPanel>

            {/* ORDERS */}
            <TabPanel value={tab} index={1}>
                <OrderCard
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
                    }]}/>
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
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanelPage);