import React,{useState} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../signup/SignUpForm.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function SignUpForm() {

    const history = useHistory();
    const url = 'http://localhost:5000/users/add';
    const [userData , setUserData] = useState({

        user_Type : "Customer",
        user_Status : "New",
        user_Fname : "",
        user_Lname : "",
        user_Contact : "", 
        user_Email : "",
        user_Address : "",
        user_City : "",
        user_Postal : "",
        user_Password : ""

    })

    function handleChange(e) {
        const newUserData = {...userData};
        newUserData[e.target.id] = e.target.value;
        setUserData(newUserData);
        console.log(newUserData)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{
            
            user_Type : userData.user_Type,
            user_Status : userData.user_Status,
            user_Fname : userData.user_Fname,
            user_Lname : userData.user_Lname,
            user_Contact : userData.user_Contact, 
            user_Email : userData.user_Email,
            user_Address : userData.user_Address,
            user_City : userData.user_City,
            user_Postal : userData.user_Postal,
            user_Password : userData.user_Password

        })
        .then((res)=>{
            localStorage.setItem("token", res.data.jwt);
            console.log(res.data.msg);
            if(res.data.msg === "User Added!"){
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
                            <Form.Control  onChange={(e) => handleChange(e)}  value={userData.user_Fname} type="text" placeholder="First Name"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control  onChange={(e) => handleChange(e)}  value={userData.user_Lname} type="text" placeholder="Last Name" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control  onChange={(e) => handleChange(e)}  value={userData.user_Email} type="Email" placeholder="Email Address"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Contact">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control  onChange={(e) => handleChange(e)}  value={userData.user_Contact} type="text" placeholder="Mobile Number" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control  onChange={(e) => handleChange(e)}  value={userData.user_Password} type="password" placeholder="Password"  />
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
