import React from 'react';
import {Bar} from 'react-chartjs-2';

const UsersChart = ({details}) => {

    let newSt = [];
    let delAssignedSt = [];
    let onTheWaySt = [];
    let reqToCancelSt = [];
    let reqToReturnSt = [];
    let returnAcceptedSt = [];

    details.forEach(element => {
        
        if(element.order_Status === "New"){
            newSt.push(element)
        }
        else if(element.order_Status === "Delivery Assigned"){
            delAssignedSt.push(element)
        }
        else if(element.order_Status === "On The Way"){
            onTheWaySt.push(element)
        }
        else if(element.order_Status === "Request to Cancel"){
            reqToCancelSt.push(element)
        }
        else if(element.order_Status === "Request to Return"){
            reqToReturnSt.push(element)
        }
        else if(element.order_Status === "Return Accepted"){
            returnAcceptedSt.push(element)
        }

    });


    return (
        <div>
            <Bar
            data={{
                labels: ['New', 'Delivery Assigned', 'On The Way' , 'Request to Cancel' , 'Request to Return','Return Accepted'],
                datasets: [{
                    label: '# of ongoing orders',
                    data: [newSt.length, delAssignedSt.length, onTheWaySt.length , reqToCancelSt.length , reqToReturnSt.length ,returnAcceptedSt.length],
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

export default UsersChart
