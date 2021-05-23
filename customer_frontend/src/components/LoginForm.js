import React from 'react';
import {Form , Button} from 'react-bootstrap';
import '../components/LoginForm.css';

function LoginForm() {
    return (

        <>
        <div className="login_form_container">

            <Form className='login_form'>

                <Form.Group className='login_form_input' controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className='login_form_input' controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  type="password" placeholder="Password" />
                </Form.Group>

                <div className='login_form_btns'>
                    <Button className='login_form_btn1' href="#">Forgot Password?</Button> 

                    <Button className='login_form_btn2' type="submit">Login</Button>
                </div>

                <div className='login_form_text'>
                    <p>Don't Have An Account? <a href='/sign-up' className='login_form_textlink' >Register Now</a></p>
                </div>

            </Form>
        </div>
        </>


 
        
    )
}

export default LoginForm;
