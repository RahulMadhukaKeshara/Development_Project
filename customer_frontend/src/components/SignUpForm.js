import React from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../components/SignUpForm.css';

function SignUpForm() {
    return (
        <>
            <div className='signup_form_container'>

                <Form className='signup_form'>

                    <Form.Row>

                        <Form.Group as={Col} controlId="formGridFname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className='signup_form_input' type="text" placeholder="First Name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className='signup_form_input' type="text" placeholder="Last Name" />
                        </Form.Group>
                        
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className='signup_form_input' type="email" placeholder="Enter Email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMobileNum">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control className='signup_form_input' type="text" placeholder="Mobile Number" />
                        </Form.Group>



                    </Form.Row>
                    
                    <Form.Row>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='signup_form_input' type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group  as={Col} controlId="formGridConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control className='signup_form_input' type="password" placeholder="Confirm Password" />
                        </Form.Group>


                    </Form.Row>

                    <div className='signup_form_btns'>             
                        <Button className='signup_form_btn1' type="submit">Sign Up</Button>
                    </div>

                    <div className='signup_form_text'>
                         <p>Already Have An Account? <a href='/login' className='signup_form_textlink' >Login</a></p>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default SignUpForm;
