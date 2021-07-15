import React,{useState} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../signup/SignUpForm.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router';
import './ResetPassword.css'

function ResetPassword() {

    const history = useHistory();
    let params = useParams();
    const url = `http://localhost:5000/users/changePassword/${params.id}`;

    const [password , setPassword] = useState({
        newPassword:"",
        confirmNewPassword:""
    })

    function handleChange(e){

        const changingPassword = {...password};
        changingPassword[e.target.id] = e.target.value;
        setPassword(changingPassword);
        console.log(changingPassword);

    }

    function handleSubmit(e){

        e.preventDefault();
        if (password.newPassword === password.confirmNewPassword) {
            
            Axios.post(url,{user_Password : password.newPassword})
            .then((res)=>{
                if(res.data === "Password Changed!"){
                    Swal.fire({
                      icon: 'success',
                      title: 'Password Changed!',
                    })
                    history.push('/');       
            
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
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
              });


        } else {

            Swal.fire({
                icon: 'info',
                title: 'Password is not confirmed!',
                text: 'please enter same password in confirm password field to confirm the new password',
              })
            
        }


    }



    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
                <Link color="inherit" href="/owner-main-page" >Home</Link>
                <Typography color="textPrimary">Change Password</Typography>
            </Breadcrumbs>
            <Divider />
            <h1 className="reset_form_title">Change Password</h1>
            <div className='reset_password_container'>

                <Form className='reset_form' onSubmit={(e) => handleSubmit(e)}>

                    <Form.Row>
                        <Col sm={12} lg={12} md={12}>
                        <Form.Group  controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control  onChange={(e) => handleChange(e)}  value={password.newPassword} type="password" placeholder="New Password"  />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={12} md={12}>
                        <Form.Group  controlId="confirmNewPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control  onChange={(e) => handleChange(e)}  value={password.confirmNewPassword} type="password" placeholder="Confirm New Password"  />
                        </Form.Group>
                        </Col>
                    </Form.Row>


                    <div className='reset_form_btns'>             
                        <Button className='reset_form_btn1' type="submit">Change Password</Button>
                    </div>

                </Form>
        </div>



            
        </>
    )
}

export default ResetPassword;
