import React from 'react';
import { Col , Row , Container , Card } from 'react-bootstrap';
import OwnerCategoryItems from './OwnerCategoryItems';
import './OwnerCategoryItems.css';
import Link from '@material-ui/core/Link';

function OwnerCategories() {
    return (
        <>
    
            <Container className='container-md  owner_category_container'>

                <h1 className='owner_category_title'>CAREGORIES</h1>

                <Row  className="justify-content-md-center">

                    <Col lg={3} md={4} className="owner_category_col">
                        {/* <OwnerCategoryItems
                        path='/users'
                        src='./images/Cat01.jpg'
                        title='USERS'
    
                        /> */}
                        <Card className='owner_category_card'>
                        <Link className="cards__item__link" href="/users">
                        <i class="fas fa-user-circle"></i>
                        <h4 >USERS</h4>
                        </Link>
                        </Card>
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    {/* <OwnerCategoryItems
                        path='/products'
                        src='./images/Cat02.jpg'
                        title="PRODUCTS"
        
                        /> */}
                        <Card className='owner_category_card'>
                        <Link className="cards__item__link" href="/products">
                        <i class="fas fa-user-circle"></i>
                        <h4 >PRODUCTS</h4>
                        </Link>
                        </Card>
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    {/* <OwnerCategoryItems
                        path='/product-categories'
                        src='./images/Cat03.jpg'
                        title='PRODUCT CATEGORIES'
    
                        /> */}
                        <Card className='owner_category_card'>
                        <Link className="cards__item__link" href="/product-categories">
                        <i class="fas fa-user-circle"></i>
                        <h4 >PRODUCT CATEGORIES</h4>
                        </Link>
                        </Card>
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    {/* <OwnerCategoryItems
                        path='/suppliers'
                        src='./images/Cat03.jpg'
                        title='SUPPLIERS'
    
                        /> */}
                                                <Card className='owner_category_card'>
                        <Link className="cards__item__link" href="/suppliers">
                        <i class="fas fa-user-circle"></i>
                        <h4 >SUPPLIERS</h4>
                        </Link>
                        </Card>
                    </Col>

                    <Col lg={3} md={4} className="owner_category_col">
                    {/* <OwnerCategoryItems
                        path='/owner-view-orders'
                        src='./images/Cat03.jpg'
                        title='ORDERS'
    
                        /> */}
                                                <Card className='owner_category_card'>
                        <Link className="cards__item__link" href="/owner-view-orders">
                        <i class="fas fa-user-circle"></i>
                        <h4 >ORDERS</h4>
                        </Link>
                        </Card>
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    {/* <OwnerCategoryItems
                        path='/generate-reports'
                        src='./images/Cat03.jpg'
                        title='GENERATE REPORTS'
    
                        /> */}
                        <Card className='owner_category_card'>
                        <Link className="cards__item__link" href="/generate-reports">
                        <i class="fas fa-user-circle"></i>
                        <h4 >GENERATE REPORTS</h4>
                        </Link>
                        </Card>
                    </Col>
                    <Col lg={3} md={4} className="owner_category_col">
                    {/* <OwnerCategoryItems
                        path='/dashboard'
                        src='./images/Cat03.jpg'
                        title='DASHBOARD'
    
                        /> */}
                                                <Card className='owner_category_card'>
                        <Link className="cards__item__link" href="/dashboard">
                        <i class="fas fa-user-circle"></i>
                        <h4 >DASHBOARD</h4>
                        </Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
      )
}

export default OwnerCategories;
