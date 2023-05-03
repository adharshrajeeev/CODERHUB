import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import axios from '../../../utils/axios'
import { POST_MONTH_WISE_COUNT } from '../../../utils/ConstUrls'
import { adminConfig } from '../../../utils/Services'


function PostChat() {
    const [postData, setPostData] = useState([]);
    const [monthNames, setMonthNames] = useState([]);
    const [state, setState] = useState({
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
          text: 'Post Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: monthNames,
        }
      },
    });
  
    useEffect(() => {
      const monthWiseReport = async () => {
        try {
          const response = await axios.get(POST_MONTH_WISE_COUNT,adminConfig);
          const data = response.data.map(({ count }) => count);
          const months = response.data.map((result) => {
            const date = new Date();
            date.setMonth(result._id - 1);
            return date.toLocaleString('default', { month: 'short' });
          });
          setPostData(data);
          setMonthNames(months)
          setState((prevState) => ({
            options: {
              ...prevState.options,
              xaxis: {
                ...prevState.options.xaxis,
                categories: months
              }
            }
          }));
        } catch (err) {
          console.log(err);
        }
      };
      monthWiseReport();
    }, []);
  
    
    return (
      <Chart
        options={state.options}
        series={[
          {
            name: 'Post Growth',
            data: postData
          }
        ]}
        type="line"
        width="500"
      />
    );
  }
export default PostChat