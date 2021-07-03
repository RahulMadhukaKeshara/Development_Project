import React from 'react';
import '../src/App.css';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/navigationBar/NavigationBar';
import HomePage from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import ProductCategoriesPage from './components/pages/ProductCategoriesPage';
import OwnerMainPage from './components/pages/OwnerMainPage';
import SuppliersPage from './components/pages/SuppliersPage';
import UsersPage from './components/pages/UsersPage';
import AddProductCategoriesPage from './components/pages/AddProductCategoriesPage';
import UpdateProductCategoriesPage from './components/pages/UpdateProductCategoriesPage';
import AddUsersPage from './components/pages/AddUsersPage';
import UpdateUsersPage from './components/pages/UpdateUsersPage';
import AddSuppliersPage from './components/pages/AddSuppliersPage';
import UpdateSuppliersPage from './components/pages/UpdateSuppliersPage';
import AddProductsPage from './components/pages/AddProductsPage';
import UpdateProductsPage from './components/pages/UpdateProductsPage';
import DisplayItemsPage from './components/pages/DisplayItemsPage';
import ProductDetailsPage from './components/pages/ProductDetailsPage';
import CartPage from './components/pages/CartPage';
import UserAccountPage from './components/pages/UserAccountPage';
import UpdateAccountDetailsPage from './components/pages/UpdateAccountDetailsPage';
import CheckoutPage from './components/pages/CheckoutPage';
import AllItemsPage from './components/pages/AllItemsPage';
import AddDeliveryChargesPage from './components/pages/AddDeliveryChargesPage';
import UpdateDeliveryChargesPage from './components/pages/UpdateDeliveryChargesPage';
import DeliveryChargesPage from './components/pages/DeliveryChargesPage';
import MyOrdersPage from './components/pages/MyOrdersPage';
import CustomerViewOrderDetailsPage from './components/pages/CustomerViewOrderDetailsPage';
import OwnerViewOrdersPage from './components/pages/OwnerViewOrdersPage';
import OwnerViewOrderDetailsPage from './components/pages/OwnerViewOrderDetailsPage';
import OwnerUpdateOrderStatusPage from './components/pages/OwnerUpdateOrderStatusPage';
import AssignDeliveryMemberPage from './components/pages/AssignDeliveryMemberPage';







function App() {
    return (
        <>
           <Router>
               <NavigationBar/>
               <Switch>

                    <Route path='/' exact component={HomePage}/>
                    <Route path='/sign-up' exact component={SignUpPage}/>
                    <Route path='/login' exact component={LoginPage}/>
                    <Route path='/owner-main-page' exact component={OwnerMainPage}/>
                    <Route path='/products' exact component={ProductsPage}/>
                    <Route path='/suppliers' exact component={SuppliersPage}/>
                    <Route path='/product-categories' exact component={ProductCategoriesPage}/>
                    <Route path='/users' exact component={UsersPage}/>
                    <Route path='/add-product-categories' exact component={AddProductCategoriesPage}/>
                    <Route path='/update-product-categories/:id' exact component={UpdateProductCategoriesPage}/>
                    <Route path='/add-users' exact component={AddUsersPage}/>
                    <Route path='/update-users/:id' exact component={UpdateUsersPage}/>
                    <Route path='/add-suppliers' exact component={AddSuppliersPage}/>
                    <Route path='/update-suppliers/:id' exact component={UpdateSuppliersPage}/>
                    <Route path='/add-products' exact component={AddProductsPage}/>
                    <Route path='/update-products/:id' exact component={UpdateProductsPage}/>
                    <Route path='/display-items/:id' exact component={DisplayItemsPage}/>
                    <Route path='/product-details/:id' exact component={ProductDetailsPage}/>
                    <Route path='/cart/:id' exact component={CartPage}/>
                    <Route path='/user-account/:id' exact component={UserAccountPage}/>
                    <Route path='/update-user-account/:id' exact component={UpdateAccountDetailsPage}/>
                    <Route path='/checkout/:id' exact component={CheckoutPage}/>
                    <Route path='/all-items' exact component={AllItemsPage}/>
                    <Route path='/add-delivery-charge' exact component={AddDeliveryChargesPage}/>
                    <Route path='/update-delivery-charge/:id' exact component={UpdateDeliveryChargesPage}/>
                    <Route path='/deliveryCharges' exact component={DeliveryChargesPage}/>
                    <Route path='/customer-orders/:id' exact component={MyOrdersPage}/>
                    <Route path='/customer-view-orderDetails/:id' exact component={CustomerViewOrderDetailsPage}/>
                    <Route path='/owner-view-orders' exact component={OwnerViewOrdersPage}/>
                    <Route path='/owner-view-orderDetails/:id' exact component={OwnerViewOrderDetailsPage}/>
                    <Route path='/owner-update-orderDetails/:id' exact component={OwnerUpdateOrderStatusPage}/>
                    <Route path='/owner-assign-deliveryMember/:id' exact component={AssignDeliveryMemberPage}/>
                    





               </Switch>
               
           </Router>
        </>
    )
}

export default App;
