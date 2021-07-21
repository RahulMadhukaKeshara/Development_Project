import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {Container , Button} from 'react-bootstrap';
import './Dashboard.css'

function SalesDashboard() {

    function createPDF() {
        // get elements of report data
        var cv = document.getElementById("cv").innerHTML;
        var style = "<style>";
        style =
          style + "table {width: 100%;font: 17px Calibri;} body{font-size:12px}";
        style =
          style +
          "table, th, td {border: solid 1px #DDD;color: black ;border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";
      
        // CREATE A WINDOW OBJECT.
        var win = window.open("", "", "height=700,width=700");
        win.document.write(
          '<html><head><link rel="stylesheet" href="./css/manager-add-style.css" />'
        );
        win.document.write("<title>Report</title>"); // <title> FOR PDF HEADER.
        win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write("</head>");
        win.document.write(cv);
        // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write("</body></html>");
        win.document.close(); // CLOSE THE CURRENT WINDOW.
        win.print(); // PRINT THE CONTENTS.
      }

    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
          <Link color="inherit" href="/owner-main-page" >
            Home
          </Link>
        <Typography color="textPrimary">Reports</Typography>
        </Breadcrumbs>
        <Divider />
        {/* <div className="btn_div_rep">
          <Button className="rep_btn" href='/salesDash'>Sales Analytics Dashboard</Button>
          <Button className="rep_btn" href='/'>Inventory Analytics Dashboard</Button>
          <Button className="rep_btn" href='/'>Main Dashboard</Button>
        </div> */}

        <Container fluid>
            <Button href='/dashboard' className="rep_btn">Overall Dashboard</Button>
            <Button href='/salesDash' className="rep_btn">Sales Analytics Dashboard</Button>
            <Button href='/inventoryDash' className="rep_btn">Inventory Analytics Dashboard</Button>
        </Container>

        <Container fluid id = "cv"  >
        <iframe title='salesdash' width="100%" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=b9d704d4-456b-420a-8795-42e3e48b55d2&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
        </Container>
        <div className="mb5 btn_div">
        <button className="pdf_btn2" onClick={createPDF}>Download PDF</button>
        </div>         
        </>
    )
}

export default SalesDashboard;
