import React,{useState,useEffect} from 'react';
import './Dashboard.css';
import Axios from 'axios';
import { Row , Col} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import DashboardCards from './DashboardCards';
import UsersChart from './UsersChart';
import { Card } from '@material-ui/core';
import PieChart from './PieChart';

function Dashboard() {

    const [orders , setOrders] = useState([]);
    const [numOrders , setNumOrders] = useState("0");
    let onGoingOrders = [];
    
    const [suppliers , setSuppliers] = useState([]);
    const [numSuppliers , setNumSuppliers] = useState("0");

    const [users , setUsers] = useState([]);
    const [numCustomer , setNumCustomer] = useState("0");
    let customers = [];

    const getSupplierData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/suppliers/"
          );
          console.log(data.data);
          setSuppliers(data.data);
          setNumSuppliers(data.data.length);
          //console.log("Customers",customers.length)
        } catch (e) {
          console.log(e);
        }
      };

    const getOrderData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/orders/"
          );
          console.log(data.data);
          setOrders(data.data);

          data.data.forEach(element => {
              if((element.order_Status !== "Delivered")&&(element.order_Status !== "Returned")&&(element.order_Status !== "Cancelled")){
                onGoingOrders.push(element)
              }
          });
          setNumOrders(onGoingOrders.length);
          //console.log("Customers",customers.length)
        } catch (e) {
          console.log(e);
        }
      };

      const getUserData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/users/"
          );
          //console.log(data.data);
          setUsers(data.data);

          data.data.forEach(element => {
              if(element.user_Type === "Customer"){
                customers.push(element)
              }
          });
          setNumCustomer(customers.length);
          //console.log("Customers",customers.length)
        } catch (e) {
          console.log(e);
        }
      };

      useEffect(() => {
        getUserData();
        getOrderData();
        getSupplierData();
       }, []);

    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Typography color="textPrimary">Dashboard</Typography>
        </Breadcrumbs>
        <Divider />
        <h1 className="dash_title" >Dashboard</h1>
        <div className='dash_container'>
            <Row>
                <Col sm={6} md={6} lg={4} className="dash_Col" >
                    <DashboardCards title="No of Customers" text= {numCustomer} />
                </Col>
                <Col sm={6} md={6} lg={4} className="dash_Col" >
                    <DashboardCards title="Ongoing Orders" text={numOrders}/>
                </Col>
                <Col sm={6} md={6} lg={4} className="dash_Col" >
                    <DashboardCards title="No of Suppliers" text={numSuppliers} />
                </Col>
            </Row>
            <Row style={{justifyContent:'space-between' , margin:'5px'}}>
                <Col sm={12} md={6} lg={7} className="dash_card2" >
                    <Card className="dash_col2_card" >
                        <UsersChart details = {orders}/>
                    </Card>
                </Col>
                <Col sm={12} md={5} lg={4} className="dash_card2" >
                    <Card className="dash_col2_card" >
                        <PieChart details = {users}/>
                    </Card>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default Dashboard;
