import React,{useState,useEffect} from 'react';
import {Modal , Button , Col  , Form} from 'react-bootstrap';
import '../cart/AddToCart.css';
import { useParams } from 'react-router';
import Axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function DelMemberUpdateExpectedDelDate(props) {

  let params = useParams();
  const history = useHistory();
  const [order , setOrder] = useState({});
  const [delAvailable , setDelAvailable] = useState([]);

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
        let assign = [];
        let dels = [];
        const data = await Axios.get(
          "http://localhost:5000/users/"
        );
        //console.log(data.data);
        //******************** */
        data.data.forEach(element => {
          if(element.user_Type === "Delivery Staff"){
            dels.push(element);
          }
        });
        //********************* */
        //console.log("dels",dels);
        dels.forEach(async(element) => {
          const available = await Axios.get(
            "http://localhost:5000/orders/ongoingOrders/" + element._id
          );
          //console.log("available",available.data.length);
          assign.push({
            ID: element._id,
            member1: element.user_Fname,
            member2: element.user_Lname,
            assigned: available.data.length
          })
        });
        //console.log(assign);
        setDelAvailable(assign);

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
          Swal.fire({
            title: 'Are you sure ?',
            text: "Do you really want to assign this member!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          })
          .then((result) => {
            if (result.isConfirmed) {
              Axios.post(url,{

                delivery_Member : order.delivery_Member,
                order_Status: "Delivery Assigned"

            })
            .then(res => {
                console.log(res.data)
                if (res.data === "Member Assigned!") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Member Assigned!',
                      })
                      props.onHide();
                      history.push('/owner-view-orders');

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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Select a Member to Assign',

        })          
      }


  }
    return (
        <>
        <Modal className='addToCart_modal'
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Assign Delivery Member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='add_product_category_form_container'>

            <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type="submit">

<Form.Row>

    <Col sm={12} >
    <Form.Group  controlId="delivery_Member">
        <Form.Label>Delivery Member</Form.Label>
        <Form.Control as="select" onChange={(e) => handleChange(e)} >
                <option selected value="Select a Staff Member">Select a Staff Member</option>
                {
                    delAvailable.map(item =>{

                        return (
                            <option key={item.ID} value={item.ID}>{item.member1} {item.member2} {item.assigned === 0 ? ("(No deliveries assigned)"):(`(${item.assigned} delivery assigned)`)}</option>  
                        )

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

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}

export default DelMemberUpdateExpectedDelDate;
