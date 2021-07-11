import React from 'react';
import { Col , Row , Container , Card } from 'react-bootstrap';
import OwnerCategoryItems from './OwnerCategoryItems';
import './OwnerCategoryItems.css';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import StorageIcon from '@material-ui/icons/Storage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

function OwnerCategories() {
    return (
        <>
    
            <Container className='container-md  owner_category_container'>

                <h1 className='owner_category_title'>CAREGORIES</h1>

                <Row  className="justify-content-md-center">

                    <Col lg={3} md={4} className="owner_category_col">
                        <OwnerCategoryItems
                        path='/users'
                        icon= {<PeopleIcon style={{fontSize:'11rem'}}/>}
                        title='USERS'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/products'
                        icon={<i class="fas fa-archive"></i>}
                        title="PRODUCTS"
        
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                       <OwnerCategoryItems
                        path='/product-categories'
                        icon={<StorageIcon style={{fontSize:'11rem'}}/>}
                        title='PRODUCT CATEGORIES'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                     <OwnerCategoryItems
                        path='/suppliers'
                        icon={<i class="fas fa-user-circle"></i>}
                        title='SUPPLIERS'
    
                        />
                    </Col>

                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/owner-view-orders'
                        icon={<ShoppingCartIcon style={{fontSize:'11rem'}}/>}
                        title='ORDERS'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/generate-reports'
                        icon={<AssignmentIcon style={{fontSize:'11rem'}}/>}
                        title='GENERATE REPORTS'
                        
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/dashboard'
                        icon={<i class="fas fa-chart-line"></i>}
                        title='DASHBOARD'
    
                        />
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    <OwnerCategoryItems
                        path='/deliveryCharges'
                        icon={<LocalAtmIcon style={{fontSize:'11rem'}}/>}
                        title='DELIVERY CHARGES'
    
                        />
                    </Col>
                </Row>
            </Container>
        </>
      )
}

export default OwnerCategories;
