import React from 'react';
import {Bar} from 'react-chartjs-2';

const InventoryChart = ({details}) => {

    let productNames = [];
    let productPrice = [];
    let productStock = [];
    let productColors = [];
    let backColor = [];


    details.forEach(element => {
        let value = 0;
        let colors = [];
        productNames.push(element.product_Name);
        backColor.push(element.product_Stock[0].color);


        element.product_Stock.forEach(item=>{
            let qty = parseInt(item.s_qty) + parseInt(item.xs_qty) + parseInt(item.m_qty) + parseInt(item.l_qty) + parseInt(item.xl_qty) + parseInt(item.xxl_qty);
            value = value + qty;
            colors.push(item.color);
        })
        //console.log("+++++++++++++",value)
        productStock.push(value);
        productColors.push(colors.length);

    });


    return (
        <div>
            <Bar
            data={{
                labels: productNames,
                datasets: [{
                    label: '# of available Items',
                    data: productStock,
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

export default InventoryChart;
