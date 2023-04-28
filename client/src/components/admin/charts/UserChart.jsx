import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import axios from '../../../utils/axios'
import { USER_MONTH_WISE_GROWTH } from '../../../utils/ConstUrls'
import { adminConfig } from '../../../utils/Services'

function UserChart() {
    const [userData,setUserData]=useState([]);
    const [state,setState]=useState({
    
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'User Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],  
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
      },
    
    }
  )

    
   
    useEffect(()=>{
      const monthWiseReport =async()=>{
       
          axios.get(USER_MONTH_WISE_GROWTH,adminConfig).then((response)=>{
            console.log(response.data)
          
            setUserData(response.data.map(({count})=>count))
          }).catch((err)=>{
            console.log(err)
          })
       
      }
      monthWiseReport();
    },[])

    
    console.log(userData)
   
  return (
   
    <Chart options={state.options} series={[{
      name: 'series-1',
      data: userData
    }]} type="line" width="500" />
  )
}

export default UserChart