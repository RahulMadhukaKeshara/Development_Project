import React,{useState} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleUsers/AddUsers.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function AddUsers() {

    const history = useHistory();
    const url = 'http://localhost:5000/users/add';
    const [data , setData] = useState({

        user_Type : "",
        user_Status : "",
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
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{
            
            user_Type : data.user_Type,
            user_Status : data.user_Status,
            user_Fname : data.user_Fname,
            user_Lname : data.user_Lname,
            user_Contact : data.user_Contact, 
            user_Email : data.user_Email,
            user_Address : data.user_Address,
            user_City : data.user_City,
            user_Postal : data.user_Postal,
            user_Password : data.user_Password

        })
        .then(res => {

            console.log(res.data.msg)
            if(res.data.msg === "User Added!"){
              Swal.fire({
                icon: 'success',
                title: 'User Added!',
              })
              history.push('/users');
      
      
            }else {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                })
          }
          })
    }


    return (
        <>


            <h1 className="add_product_category_title">Add User</h1>
            <div className='add_product_category_form_container'>

                

                <Form className='add_product_category_form'  onSubmit={(e) => handleSubmit(e)} type='submit'>


                    <h4 className="add_product_category_sub_title">Personal Details</h4>
                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Fname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.user_Fname} type="text" placeholder="First Name"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.user_Lname} type="text" placeholder="Last Name" />
                        </Form.Group>
                        </Col>


                    </Form.Row>



                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.user_Email} type="text" placeholder="Email Address"  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Contact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.user_Contact} type="text" placeholder="Contact Number" />
                        </Form.Group>
                        </Col>

                    </Form.Row>


                    <h4 className="add_product_category_sub_title">Account Details</h4>

                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Type">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={data.user_Type} >
                                    <option>Select...</option>
                                    <option>Delivery Staff</option>
                                    <option>Admin</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Status">
                            <Form.Label>User Status</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={data.user_Status} >
                                    <option>Select...</option>
                                    <option>New</option>
                                    <option>Verified</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                    </Form.Row>


                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control  type="password" onChange={(e) => handleChange(e)}  value={data.user_Password} placeholder="Password" />
                        </Form.Group>

                        </Col>

                    </Form.Row>


                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Add User</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default AddUsers;
