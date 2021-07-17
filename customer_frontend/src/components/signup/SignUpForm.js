import React,{useState} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../signup/SignUpForm.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function SignUpForm() {

    const history = useHistory();
    const url = 'http://localhost:5000/users/signup';
    const [userData , setUserData] = useState({

        user_Type : "Customer",
        user_Status : "New",
        user_Fname : "",
        user_Lname : "",
        user_Contact : "", 
        user_Email : "",
        user_Address_1 : "", 
        user_Address_2 : "",
        user_Address_3 : "",
        user_District : "",
        user_Postal : "",
        user_Password : "",
        signUpConfirmPass : ""


    })

    function handleChange(e) {
        const newUserData = {...userData};
        newUserData[e.target.id] = e.target.value;
        setUserData(newUserData);
        console.log(newUserData)
    }

    function handleSubmit(e){

        e.preventDefault();
        if (userData.user_Password === userData.signUpConfirmPass) {
            Axios.post(url,{
                
                user_Type : userData.user_Type,
                user_Status : userData.user_Status,
                user_Fname : userData.user_Fname,
                user_Lname : userData.user_Lname,
                user_Contact : userData.user_Contact, 
                user_Email : userData.user_Email,
                user_Address_1 : userData.user_Address_1,
                user_Address_2 : userData.user_Address_2,
                user_Address_3 : userData.user_Address_3,
                user_District : userData.user_District,
                user_Postal : userData.user_Postal,
                user_Password : userData.user_Password
    
            })
            .then((res)=>{
                console.log(res.data)
                if(res.data === "User Added!"){
                    Swal.fire({
                      icon: 'success',
                      title: 'Registered In Successfully!',
                    })
                    history.push('/login');       
            
                }
    
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                }
    
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'info',
                    title: 'Already Registered',
                    text: 'Use different email for create new account',
                  })
              });

            
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Password is not confirmed!',
                text: 'please enter same password in confirm password field to confirm the new password',
              })
            
        }


    }

    return (
        <>
            <div className='signup_form_container'>

                <Form className='signup_form' onSubmit={(e) => handleSubmit(e)}>

                    <h6 className="signup_form_sub_text">Fill all the details below...</h6>
                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Fname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control  required onChange={(e) => handleChange(e)}  value={userData.user_Fname} type="text" placeholder="First Name"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control  required onChange={(e) => handleChange(e)}  value={userData.user_Lname} type="text" placeholder="Last Name" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control  required onChange={(e) => handleChange(e)}  value={userData.user_Email} type="Email" placeholder="Email Address"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Contact">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control  required onChange={(e) => handleChange(e)}  value={userData.user_Contact} type="tel" pattern="[0-9]{10}" placeholder="Mobile Number" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control  required onChange={(e) => handleChange(e)}  value={userData.user_Password} type="password" placeholder="Password"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="signUpConfirmPass">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required  onChange={(e) => handleChange(e)}  type="password" placeholder="Confirm Password" />
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
