import React,{useState} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../components/AddSuppliers.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';




function AddSuppliers() {

    const history = useHistory();
    const url = 'http://localhost:5000/suppliers/add';
    const [data , setData] = useState({

        supplier_Name : "",
        supplier_Description : "",
        supplier_Contact : "",
        supplier_Email : "",
        supplier_Address : ""

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
            
            supplier_Name : data.supplier_Name,
            supplier_Description : data.supplier_Description,
            supplier_Contact : data.supplier_Contact,
            supplier_Email : data.supplier_Email,
            supplier_Address : data.supplier_Address

        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Supplier Added!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Supplier Added!',

                  })
                  history.push('/suppliers');

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


            <h1 className="add_product_category_title">Add Supplier</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type='submit'>

                    <Form.Row>

                        <Col sm={12}>
                        <Form.Group  controlId="supplier_Name">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.supplier_Name} type="text" placeholder="Supplier Name" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="supplier_Email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.supplier_Email} type="email" placeholder="Email Address"  />
                        </Form.Group>

                        </Col>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="supplier_Contact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.supplier_Contact} type="text" placeholder="Contact Number" />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="supplier_Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.supplier_Address} type="text" placeholder="Address..."  />
                        </Form.Group>

                        </Col>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="supplier_Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' onChange={(e) => handleChange(e)}  value={data.supplier_Description} type="text" placeholder="Description..." />
                        </Form.Group>
                        </Col>
                    </Form.Row>



                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Add</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default AddSuppliers;
