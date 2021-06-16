import React,{useState} from 'react';
import {Form , Button, Col} from 'react-bootstrap';
import '../login/LoginForm.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function LoginForm() {

    const history = useHistory();
    const url = 'http://localhost:5000/users/login';
    const [loginData, setloginData] = useState({
        user_Email: "",
        user_Password: "",
      });

    function handleChange(e) {
        const newLoginData = {...loginData};
        newLoginData[e.target.id] = e.target.value;
        setloginData(newLoginData);
        console.log(newLoginData)
    }

    //Login User
  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios
      .post(url, loginData)
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        Swal.fire({
            icon: 'success',
            title: `${res.data.msg}`,
          })
      })
      .then(() => {
            history.push("/");

      })
      .catch((e) => {
        Swal.fire({
            icon: 'info',
            title: 'Invalid Login',
            text: 'Check Your Email and Password',
          })
      });
  };


    return (

        <>
        
        <div className='login_form_container'>

        <Form className='login_form' onSubmit={(e) => handleSubmit(e)}>

            <Form.Row>
                <Col sm={12}>
                <Form.Group  controlId="user_Email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control  onChange={(e) => handleChange(e)}  value={loginData.user_Email} type="Email" placeholder="Email Address"  />
                </Form.Group>

                </Col>
            </Form.Row>

            <Form.Row>
                <Col sm={12}>
                <Form.Group  controlId="user_Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  onChange={(e) => handleChange(e)}  value={loginData.user_Password} type="password" placeholder="Password"  />
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
