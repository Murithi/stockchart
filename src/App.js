import { Segment, Header, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import tickers from './tickers.js'
function App() {

  const options = tickers.map((item, index) => ({
    key: index,
    text: item.ticker,
    value: item.ticker
  }))

  return (
    <>
      <Segment>
        <Header as='h4' textAlign="right">
          <Dropdown
            placeholder='Select a Ticker'
            search
            selection
            options={options} />
        </Header>
      </Segment>
    </>
  )
}

export default App;
