import React from 'react';
import {Form , Button, Col} from 'react-bootstrap';
import '../login/LoginForm.css';

function LoginForm() {
    return (

        <>
        
        <div className='login_form_container'>

        <Form className='login_form'>

            <Form.Row>
                <Col sm={12}>
                <Form.Group  controlId="loginEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control  type="Email" placeholder="Email Address"  />
                </Form.Group>

                </Col>
            </Form.Row>

            <Form.Row>
                <Col sm={12}>
                <Form.Group  controlId="loginPass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  type="password" placeholder="Password"  />
                </Form.Group>

                </Col>
            </Form.Row>

            <div className='login_form_btns'>             
                <Button className='login_form_btn2' href='#'>Forgot Password?</Button>
                <Button className='login_form_btn1' type="submit">Login</Button>
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
