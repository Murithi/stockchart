import React, { useState, useEffect } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from 'axios';
import { Segment, Header, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import tickers from './tickers.js'

function App() {

  const [data, setData] = useState([])

  const options = tickers.map((item, index) => ({
    key: index,
    text: item.ticker,
    value: item.ticker
  }))

  useEffect(() => {
    let url = `https://data.nasdaq.com/api/v3/datasets/WIKI/AAL.json?api_key=${process.env.REACT_APP_API_KEY}`
    fetchApiData(url)
  }, [])

  const fetchApiData = (url) => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let openHighLowClose = [], volume = []

  if (data.length !== 0) {

    openHighLowClose = []
    volume = []

    let sortedData = data.dataset.data.sort((a, b) => {
      if (a[0] > b[0]) {
        return 1
      } else if (a[0] < b[0]) {
        return -1
      }
    })

    sortedData.map(item => {
      openHighLowClose.push([
        Date.parse(item[0]),
        item[1],
        item[2],
        item[3],
        item[4]
      ]);
      volume.push([
        Date.parse(item[0]),
        item[5]
      ]);
    })
  }
  const stockOptions = {

    title: {
      text: (data.length === 0) ? 'AAPL Stock Price' : `${data.dataset.name}`
    },

    credits: {
      enabled: false
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "OHLC"
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true
        }
      },
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "Volume"
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2
      }
    ],

    tooltip: {
      split: true
    },

    series: [{
      type: "candlestick",
      data: openHighLowClose,
    },
    {
      type: 'column',
      name: 'Volume',
      data: volume,
      yAxis: 1,

    }
    ]

  };


  return (
    <>
      <Segment>
        <Header as='h4' textAlign="right">
          <Dropdown
            placeholder='Select a Ticker'
            search
            selection
            onChange={(e, { value }) => {
              const url = `https://data.nasdaq.com/api/v3/datasets/WIKI/${value}.json?api_key=${process.env.REACT_APP_API_KEY}`
              fetchApiData(url)
            }}
            options={options} />
        </Header>

      </Segment>
      <Segment>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={stockOptions}
        />
      </Segment>
    </>
  )
}

export default App;
