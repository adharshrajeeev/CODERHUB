import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import axios from '../../../utils/axios'
import { USER_MONTH_WISE_GROWTH } from '../../../utils/ConstUrls'
import { adminConfig } from '../../../utils/Services'

function UserChart() {
  const [userData, setUserData] = useState([]);
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
        categories: monthNames,
      }
    },
  });

  useEffect(() => {
    const monthWiseReport = async () => {
      try {
        const response = await axios.get(USER_MONTH_WISE_GROWTH,adminConfig);
        const data = response.data.map(({ count }) => count);
        const months = response.data.map((result) => {
          const date = new Date();
          date.setMonth(result._id - 1);
          return date.toLocaleString('default', { month: 'short' });
        });
        setUserData(data);
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
        console.log(monthNames)
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
          name: 'User Growth',
          data: userData
        }
      ]}
      type="line"
      width="500"
    />
  );
}

export default UserChart