import React,{useState,useEffect} from 'react';
import './Dashboard.css';
import Axios from 'axios';
import { Row , Col, Container} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import DashboardCards from './DashboardCards';
import UsersChart from './UsersChart';
import { Card } from '@material-ui/core';
import PieChart from './PieChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InventoryChart from './InventoryChart';
import FinishedOrderCharts from './FinishedOrderCharts';

function Dashboard() {

    const [orders , setOrders] = useState([]);
    const [numOrders , setNumOrders] = useState("0");
    let onGoingOrders = [];
    
    const [suppliers , setSuppliers] = useState([]);
    const [numSuppliers , setNumSuppliers] = useState("0");

    const [users , setUsers] = useState([]);
    const [numCustomer , setNumCustomer] = useState("0");
    let customers = [];

    const [products , setProducts] = useState([]);

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

      const getProductData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/products/"
          );
          //console.log(data.data);
          setProducts(data.data);
          //console.log("Customers",customers.length)
        } catch (e) {
          console.log(e);
        }
      };

      useEffect(() => {
        getUserData();
        getOrderData();
        getProductData();
        getSupplierData();
       }, []);

       function createPDF() {
        // get elements of report data
        var cv = document.getElementById("cv").innerHTML;
      
        var style = "<style>";
        style =
          style + "table {width: 100%;font: 17px Calibri;} body{font-size:12px}";
        style =
          style +
          "table, th, td {border: solid 1px #DDD;color: black ;border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";
      
        // CREATE A WINDOW OBJECT.
        var win = window.open("", "", "height=700,width=700");
      
        win.document.write(
          '<html><head><link rel="stylesheet" href="./css/manager-add-style.css" />'
        );
        win.document.write("<title>Report</title>"); // <title> FOR PDF HEADER.
        win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write("</head>");
        win.document.write(cv);
        // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write("</body></html>");
      
        win.document.close(); // CLOSE THE CURRENT WINDOW.
      
        win.print(); // PRINT THE CONTENTS.
      }

    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Typography color="textPrimary">Dashboard</Typography>
        </Breadcrumbs>
        <Divider />
        <Container fluid id="cv">
        <iframe title="dashboards" width="100%" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=b9d704d4-456b-420a-8795-42e3e48b55d2&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
        </Container>
        {/* <h1 className="dash_title" >Dashboard</h1>
        <div className='dash_container' id="divToPrint" >
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
            <Row style={{justifyContent:'space-between' , margin:'5px'}}>
              <Col sm={12} md={5} lg={4} className="dash_card2" >
                    <Card className="dash_col2_card" >
                        <FinishedOrderCharts details = {orders}/>
                    </Card>
                </Col>  
                <Col sm={12} md={6} lg={7} className="dash_card2" >
                    <Card className="dash_col2_card" >
                        <InventoryChart details = {products}/>
                    </Card>
                </Col>

            </Row>
        </div> */}
        <div className="mb5 btn_div">
        <button className="pdf_btn2" onClick={createPDF}>Download PDF</button>
        </div>
        </>
    )
}

export default Dashboard;
