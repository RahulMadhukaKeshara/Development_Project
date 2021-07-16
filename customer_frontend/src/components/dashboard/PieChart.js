import React from 'react';
import {Pie} from 'react-chartjs-2';

const PieChart = ({details}) => {

    let numCustomer = [];
    let numDelivery = [];
    let numAdmins = [];

    details.forEach(element => {
        
        if(element.user_Type === "Customer"){
            numCustomer.push(element)
        }
        else if(element.user_Type === "Admin"){
            numAdmins.push(element)
        }
        else if(element.user_Type === "Delivery Staff"){
            numDelivery.push(element)
        }

    });

    return (
        <div>
            <Pie
            data={{
                labels: ['Customers', 'Delivery Staff', 'Admins'],
                datasets: [{
                    label: '# of Users',
                    data: [numCustomer.length, numDelivery.length, numAdmins.length],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            }}
            height={500}
            width= {750}
            options={{ 
                
                maintainAspectRatio: false,
                scales:{
                    yAxes: [{
                        ticks :{
                            beginAtZero: true
                        }
                    }]
                }
             }}
            />
        </div>
    )
}

export default PieChart;
