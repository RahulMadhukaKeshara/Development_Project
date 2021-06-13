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
                    <Route path='/update-products' exact component={UpdateProductsPage}/>
                    <Route path='/display-items' exact component={DisplayItemsPage}/>
                    <Route path='/product-details/:id' exact component={ProductDetailsPage}/>



               </Switch>
               
           </Router>
        </>
    )
}

export default App;
