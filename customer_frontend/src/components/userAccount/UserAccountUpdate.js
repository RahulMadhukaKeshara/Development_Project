import React , {useState , useEffect} from 'react';
import { useParams } from 'react-router';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleUsers/AddUsers.css';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';

function UserAccountUpdate() {

    let params = useParams();
    const history = useHistory();
    const [user , setUser] = useState({});
    const [deliveryCharges , setDeliveryCharges] = useState([]);

    const url = 'http://localhost:5000/users/update/user-account/' + params.id;

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
    
      const getDeliveryChargeData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/deliveryCharges/"
          );
          // console.log(data.data);
          setDeliveryCharges(data.data);
        } catch (e) {
          console.log(e);
        }
      };
      useEffect(() => {
        getUserData();
        getDeliveryChargeData();
      }, []);

    function handleChange(e) {
        const newUser = {...user};
        newUser[e.target.id] = e.target.value;
        setUser(newUser);
        console.log(newUser)
    }

    function handleSubmit(e){
        e.preventDefault();
        let district = "";
        if (user.user_District === "Choose...") {
            district = "";
        }else{
            district = user.user_District;
        }

        Swal.fire({
            title: 'Are you sure ?',
            text: "You want to save the changes!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          })
          .then((result) => {
            if (result.isConfirmed) {
                Axios.post(url,{

                    user_Fname : user.user_Fname,
                    user_Lname : user.user_Lname,
                    user_Contact : user.user_Contact, 
                    user_Address_1 : user.user_Address_1,
                    user_Address_2 : user.user_Address_2,
                    user_Address_3 : user.user_Address_3, 
                    user_District : district, 
                    user_Postal : user.user_Postal,
        
                })
                .then(res => {
                    console.log(res.data)  
                    if (res.data === "Account Details Updated!") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Account Details Updated!',
                          })
                          history.push(`/user-account/${params.id}`);
        
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
        
                          })
                    }          
                })
            }else{
              
            }
          })


    }



    return (
        <>
            <h1 className="add_product_category_title">Update Account Details</h1>
            <div className='add_product_category_form_container'>

                

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)}>


                    <h4 className="add_product_category_sub_title">Personal Details</h4>
                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Fname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  required value={user.user_Fname}  />
                        </Form.Group>

                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  required value={user.user_Lname}  />
                        </Form.Group>
                        </Col>


                    </Form.Row>



                    <Form.Row>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Contact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control className='add_product_category_form_input' type="tel" onChange={(e) => handleChange(e)}  pattern="[0-9]{10}" required value={user.user_Contact}  placeholder="0700000000"/>
                        </Form.Group>

                        </Col>

                    </Form.Row>

                    {
                    user.user_Type === "Customer" ?
                    (
                    <>
                    <h4 className="add_product_category_sub_title">Billing Address</h4>
                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="user_Address_1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={user.user_Address_1} type="text" placeholder="Address Line 1..."  />
                            </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Address_2">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={user.user_Address_2} placeholder="Address Line 2..." />
                        </Form.Group>
                        </Col>                       
                    </Form.Row> 
                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="user_Address_3">
                                <Form.Label>Address Line 3</Form.Label>
                                <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={user.user_Address_3} type="text" placeholder="Address Line 3..."  />
                            </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_District">
                        <Form.Label>District</Form.Label>
                        <Form.Control as="select" onChange={(e) => handleChange(e)}  value={user.user_District}>
                                    <option>Choose...</option>
                        {
                                deliveryCharges && deliveryCharges.map(item => 
                                    <option>{item.district}</option>
                                )
                        }
                        </Form.Control>
                        </Form.Group>
                        <Form.Group  controlId="user_Postal">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={user.user_Postal} placeholder="Postal Code..."/>
                        </Form.Group>
                        </Col>                       
                    </Form.Row>                  
                    </>):
                    (
                        <>
                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="user_Address_1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={user.user_Address_1} type="text" placeholder="Address Line 1..."  />
                            </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_Address_2">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control className='add_product_category_form_input' type="text" onChange={(e) => handleChange(e)}  value={user.user_Address_2} placeholder="Address Line 2..." />
                        </Form.Group>
                        </Col>                       
                    </Form.Row> 
                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                            <Form.Group  controlId="user_Address_3">
                                <Form.Label>Address Line 3</Form.Label>
                                <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={user.user_Address_3} type="text" placeholder="Address Line 3..."  />
                            </Form.Group>
                        </Col>

                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="user_District">
                        <Form.Label>District</Form.Label>
                        <Form.Control as="select" onChange={(e) => handleChange(e)}  value={user.user_District}>
                                    <option>Choose...</option>
                        {
                                deliveryCharges && deliveryCharges.map(item => 
                                    <option>{item.district}</option>
                                )
                        }
                        </Form.Control>
                        </Form.Group>
                        </Col>                       
                    </Form.Row>                  
                        </>)
                    }


                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Update User</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default UserAccountUpdate;
