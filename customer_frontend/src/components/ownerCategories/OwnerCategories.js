import React from 'react';
import { Col , Row , Container} from 'react-bootstrap';
import OwnerCategoryItems from './OwnerCategoryItems';
import './OwnerCategoryItems.css';

function OwnerCategories() {
    return (
        <>
    
            <Container className='container-md  owner_category_container'>

                <h1 className='owner_category_title'>CAREGORIES</h1>

                <Row  className="justify-content-md-center">

                    <Col lg={3} md={4} className="owner_category_col">
                        <OwnerCategoryItems
                        path='/users'
                        src='./images/Cat01.jpg'
                        title='USERS'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/products'
                        src='./images/Cat02.jpg'
                        title="PRODUCTS"
        
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/product-categories'
                        src='./images/Cat03.jpg'
                        title='PRODUCT CATEGORIES'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/suppliers'
                        src='./images/Cat03.jpg'
                        title='SUPPLIERS'
    
                        />
                    </Col>

                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/owner-view-orders'
                        src='./images/Cat03.jpg'
                        title='ORDERS'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/generate-reports'
                        src='./images/Cat03.jpg'
                        title='GENERATE REPORTS'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/dashboard'
                        src='./images/Cat03.jpg'
                        title='DASHBOARD'
    
                        />
                    </Col>
                </Row>
            </Container>
        </>
      )
}

export default OwnerCategories;
