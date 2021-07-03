import React from 'react';
import { Col , Row , Container} from 'react-bootstrap';
import DeliverStaffCatItems from './DeliveryStaffCatItems';
import '../deliveryStaff_Categoies/DeliveryStaffCatItems.css';
import jwtDecode from "jwt-decode";

function DeliveryStaffCatCards() {

    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;

    return (
        <>
    
            <Container className='container-md  delStaff_category_container'>

                <h1 className='delStaff_category_title'>CAREGORIES</h1>

                <Row  className="justify-content-md-center">

                    <Col lg={3} md={4} className="delStaff_category_col">
                        <DeliverStaffCatItems
                        path={'/newly-assigned-deliveries/'+ userID}
                        src='./images/Cat01.jpg'
                        title='NEWLY ASSIGNED DELIVERIES'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="delStaff_category_col">
                    <DeliverStaffCatItems
                        path={'/newly-assigned-deliveries/'+ userID}
                        src='./images/Cat02.jpg'
                        title="DELIVERY HISTORY"
        
                        />
                    </Col>

                </Row>
            </Container>
        </>
      )
}

export default DeliveryStaffCatCards;
