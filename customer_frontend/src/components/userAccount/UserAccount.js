import React , {useState , useEffect} from 'react';
import '../userAccount/UserAccount.css';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import {Row,Col ,Container,Button} from 'react-bootstrap'
import { useParams } from 'react-router';
import Axios from 'axios';

function UserAccount() {

    let params = useParams();
    const [user , setUser] = useState({});

    const getUserData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/users/"+ params.id
          );
          //console.log(data.data);
          setUser(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getUserData();
      }, []);



    return (
        <>

        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
            <Link color="inherit" href="/owner-main-page" >Home</Link>
            <Typography color="textPrimary">Account Details</Typography>
        </Breadcrumbs>
        <Divider />
        <Container className="account_container">
        <Container  className="account_container1">
        <div>
            <h4>Name : {`${user.user_Fname}  ${user.user_Lname}`}</h4>
            <h4>Type : {user.user_Type}</h4>
            <h4>Status : {user.user_Status}</h4>
        </div>
        <div>
            <Button className='signup_form_btn1' href={"/update-user-account/" + params.id}>Edit Account Details</Button>
        </div>
        </Container>

        <Divider className="account_divider" />

        <Container  className="account_container2">
        <h3 className="account_sub_title">Personal Details</h3>
        <Row>
        <Col sm={12} lg={6} md={6}>
            <h5>Name : {`${user.user_Fname}  ${user.user_Lname}`}</h5>
        </Col>

        <Col sm={12} lg={6} md={6}>
            <h5>Email : {user.user_Email}</h5>
        </Col>
        </Row>
        <Row>
        <Col sm={12} lg={6} md={6}>
            <h5>Contact : {user.user_Contact}</h5>
        </Col>
        </Row>

        {
        user.user_Type === "Customer" ? 
        (<>
            <Divider className="account_divider"/>
            <h3 className="account_sub_title">Billing Address</h3>
            <Row>
            <Col sm={12} lg={6} md={6}>
                <h5>Address : {user.user_Address !== "" ? (user.user_Address):("Not Given")}</h5>
            </Col>
            <Col sm={12} lg={6} md={6}>
                <h5>City : {user.user_City !== "" ? (user.user_City):("Not Given")}</h5>
            </Col>
            </Row>
            <Row>
            <Col sm={12} lg={6} md={6}>
                <h5>Postal Code : {user.user_Postal !== "" ? (user.user_Postal):("Not Given")}</h5>
            </Col>
            </Row>
        </>):
        (<>
            <h3 className="account_sub_title">Address</h3>
            <Row>
            <Col sm={12} lg={6} md={6}>
                <h5>Address : {user.user_Address !== "" ? (user.user_Address):("Not Given")}</h5>
            </Col>
            <Col sm={12} lg={6} md={6}>
                <h5>City : {user.user_City !== "" ? (user.user_City):("Not Given")}</h5>
            </Col>
            </Row>
        </>)
        }

        </Container>  
        </Container>
       
        
        
        
        </>
    )
}

export default UserAccount;
