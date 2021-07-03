import React , {useState , useEffect} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import { useParams } from 'react-router';
import Axios from 'axios';
import '../handleProductCategories/AddProductCategory.css';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function AssignDeliveryMember() {
    let params = useParams();
    const history = useHistory();
    const [order , setOrder] = useState({});
    const [delMembers , setDelMembers] = useState([]);

    const url = 'http://localhost:5000/orders/assignMember/update/' + params.id;

    const getOrderData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/orders/orderDetails/"+ params.id
          );
          console.log(data.data);
          setOrder(data.data);
        } catch (e) {
          console.log(e);
        }
      };

      const getDelMemberData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/users/"
          );
          console.log(data.data);
          setDelMembers(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getOrderData();
        getDelMemberData();
      }, []);


    function handleChange(e) {
          const newOrder = {...order};
          newOrder[e.target.id] = e.target.value;
          setOrder(newOrder);
          console.log(newOrder)
        //console.log(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if (order.delivery_Member) {
          if ((order.delivery_Member === "Select a Staff Member")&&(order.delivery_Member === "")) {
            Swal.fire({
              icon: 'error',
              title: 'Select a Member to Assign',
  
            })     
          } else {
                Axios.post(url,{

                    delivery_Member : order.delivery_Member

                })
                .then(res => {
                    console.log(res.data)
                    if (res.data === "Member Assigned!") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Member Assigned!',
                          })
                          history.push('/owner-view-orderDetails/' + params.id);

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',

                          })
                    }            
                })
          }         
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Select a Member to Assign',

          })          
        }


    }


    return (
        <>
            <h1 className="add_product_category_title">Assign Delivery Member</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type="submit">

                    <Form.Row>

                        <Col sm={12} >
                        <Form.Group  controlId="delivery_Member">
                            <Form.Label>Delivery Member</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleChange(e)} >
                                    <option value="Select a Staff Member">Select a Staff Member</option>
                                    {
                                        delMembers.map(delMembers =>{

                                            return delMembers.user_Type === "Delivery Staff" ? 
                                            (
                                                <option key={delMembers._id} value={delMembers._id}>{delMembers.user_Fname} {delMembers.user_Lname}</option>  
                                            ):
                                            ("")

                                        }    
                                            )
                                    }
                            </Form.Control>
                        </Form.Group>
                        </Col>


                    </Form.Row>

                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Assign Member</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}
export default AssignDeliveryMember;
