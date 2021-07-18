import React from 'react';
import {Pie} from 'react-chartjs-2';

const FinishedOrderCharts = ({details}) => {

    let delivered = [];
    let returned = [];
    let cancelled = [];

    details.forEach(element => {
        
        if(element.order_Status === "Delivered"){
            delivered.push(element)
        }
        else if(element.order_Status === "Returned"){
            returned.push(element)
        }
        else if(element.order_Status === "Cancelled"){
            cancelled.push(element)
        }

    });

    return (
        <div>
            <Pie
            data={{
                labels: ['Delivered', 'Returned', 'Cancelled'],
                datasets: [{
                    label: '# of Finished Orders',
                    data: [delivered.length, returned.length, cancelled.length],
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
            // options={{ 
                
            //     maintainAspectRatio: false,
            //     scales:{
            //         yAxes: [{
            //             ticks :{
            //                 beginAtZero: true
            //             }
            //         }]
            //     }
            //  }}
            />
        </div>
    )
}

export default FinishedOrderCharts;
