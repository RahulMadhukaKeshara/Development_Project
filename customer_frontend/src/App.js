import React from 'react';
import '../src/App.css';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';

function App() {
    return (
        <>
           <Router>
               <NavigationBar/>
               <Switch>

                    <Route path='/' exact component={HomePage}/>
                    <Route path='/products' exact component={ProductsPage}/>
                    <Route path='/sign-up' exact component={SignUpPage}/>
                    <Route path='/login' exact component={LoginPage}/>

               </Switch>
           </Router>
        </>
    )
}

export default App;
