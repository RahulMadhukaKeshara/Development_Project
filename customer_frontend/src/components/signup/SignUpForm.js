import React from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../signup/SignUpForm.css';

function SignUpForm() {
    return (
        <>
            <div className='signup_form_container'>

                <Form className='signup_form'>

                    <h6 className="signup_form_sub_text">Fill all the details below...</h6>
                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="signUpFname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control  type="text" placeholder="First Name"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="signUpLname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control  type="text" placeholder="Last Name" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="signUpEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control  type="Email" placeholder="Email Address"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="signUpMobile">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control  type="text" placeholder="Mobile Number" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="signUpPass">
                            <Form.Label>Password</Form.Label>
                            <Form.Control  type="password" placeholder="Password"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="signUpConfirmPass">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control  type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        </Col>
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
