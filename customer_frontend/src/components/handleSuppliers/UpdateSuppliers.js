import React , {useState , useEffect} from 'react';
import {Form , Button , Col} from 'react-bootstrap';
import '../handleSuppliers/AddSuppliers.css';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';
import Axios from 'axios';




function UpdateSuppliers() {

    let params = useParams();
    const history = useHistory();
    const [supplier , setSupplier] = useState({});

    const url = 'http://localhost:5000/suppliers/update/' + params.id;

    const getSupplierData = async () => {
        try {
          const data = await Axios.get(
            "http://localhost:5000/suppliers/"+ params.id
          );
          console.log(data.data);
          setSupplier(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getSupplierData();
      }, []);

      function handleChange(e) {
        const newSupplier = {...supplier};
        newSupplier[e.target.id] = e.target.value;
        setSupplier(newSupplier);
        console.log(newSupplier)
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{

            supplier_Name : supplier.supplier_Name,
            supplier_Description : supplier.supplier_Description,
            supplier_Contact : supplier.supplier_Contact,
            supplier_Email : supplier.supplier_Email,
            supplier_Address : supplier.supplier_Address,

        })
        .then(res => {
            console.log(res.data)
            if (res.data === "Supplier Updated!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Supplier Updated!',
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

            <h1 className="add_product_category_title">Update Supplier</h1>
            <div className='add_product_category_form_container'>

                <Form className='add_product_category_form' onSubmit={(e) => handleSubmit(e)} type="submit" >

                    <Form.Row>
                        <Col sm={12} >
                        <Form.Group  controlId="supplier_Name" >
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control className='add_product_category_form_input' required onChange={(e) => handleChange(e)}  value={supplier.supplier_Name} type="text"  />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="supplier_Email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control className='add_product_category_form_input' required onChange={(e) => handleChange(e)}  value={supplier.supplier_Email} type="text"   />
                        </Form.Group>

                        </Col>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="supplier_Contact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control className='add_product_category_form_input' required onChange={(e) => handleChange(e)}  value={supplier.supplier_Contact} type="tel" pattern="[0-9]{10}" maxLength="10" placeholder="07********"  />
                        </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="supplier_Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input' required onChange={(e) => handleChange(e)}  value={supplier.supplier_Address} type="text"  />
                        </Form.Group>

                        </Col>
                        <Col sm={12} lg={6} md={6}>
                        <Form.Group  controlId="supplier_Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} className='add_product_category_form_input'  required onChange={(e) => handleChange(e)}  value={supplier.supplier_Description} type="text"  />
                        </Form.Group>
                        </Col>
                    </Form.Row>



                    <div className='add_product_category_form_btns'>             
                        <Button className='add_product_category_form_btn1' type="submit">Update</Button>
                    </div>

                </Form>
            </div>
            
        </>
    )
}

export default UpdateSuppliers;