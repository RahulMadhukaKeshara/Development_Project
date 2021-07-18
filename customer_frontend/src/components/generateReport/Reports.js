import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

function Reports() {
    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumb">
          <Link color="inherit" href="/owner-main-page" >
            Home
          </Link>
        <Typography color="textPrimary">Reports</Typography>
        </Breadcrumbs>
        <Divider />
        {/* <div className = "rep_canvas">
            
        </div> */}
        <iframe title="reports" width="100%" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=2f7622d2-fa7e-4934-9550-d2985a516f9f&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
        </>
    )
}

export default Reports;
