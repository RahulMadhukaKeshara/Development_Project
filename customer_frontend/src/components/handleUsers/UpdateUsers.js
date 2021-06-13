import React , {useState , useEffect} from 'react';
import { useParams } from 'react-router';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleUsers/AddUsers.css';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';

function UpdateUsers() {

    let params = useParams();
    const history = useHistory();
    const [user , setUser] = useState({});

    const url = 'http://localhost:5000/users/update/' + params.id;

    const getUserData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/users/"+ params.id
          );
          console.log(data.data);
          setUser(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getUserData();
      }, []);

      function handleChange(e) {
        const newUser = {...user};
        newUser[e.target.id] = e.target.value;
        setUser(newUser);
        console.log(newUser)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{

            user_Type : user.user_Type, 
            user_Status : user.user_Status,
            user_Fname : user.user_Fname,
            user_Lname : user.user_Lname,
            user_Contact : user.user_Contact, 
            user_Email : user.user_Email,
            user_Address : user.user_Address, 
            user_City : user.user_City, 
            user_Postal : user.user_Postal,
            user_Password : user.user_Postal

        })
        .then(res => {
            console.log(res.data)  
            if (res.data === "User Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'User Updated!',
                  })
                  history.push('/users');

            } else {
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
            <h1 className="add_product_category_title">Update User</h1>
            <div className='add_product_category_form_container'>

                

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)}>


                    <h4 className="add_product_category_sub_title">Personal Details</h4>
                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Fname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={user.user_Fname}  disabled/>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={user.user_Lname} disabled />
                        </Form.Group>
                        </Col>


                    </Form.Row>



                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={user.user_Email} disabled />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Contact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={user.user_Contact} disabled/>
                        </Form.Group>
                        </Col>

                    </Form.Row>


                    <h4 className="add_product_category_sub_title">Account Details</h4>

                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Type">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={user.user_Type}>
                                    <option>Customer</option>
                                    <option>Delivery Staff</option>
                                    <option>Admin</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Status">
                            <Form.Label>User Status</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)}  value={user.user_Status}>
                                    <option>New</option>
                                    <option>Verified</option>
                            </Form.Control>
                        </Form.Group>

                        </Col>

                    </Form.Row>


                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Update User</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default UpdateUsers;
