import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import tickers from './tickers.js'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it("Should display ticker dropdown", () => {
//   render(<App />);
   
//   expect(screen.getByText(/Select a Ticker/i)).toBeInTheDocument();

// })
it("Should display a dropdown", () => {
  const { getByTestId } = render(<App />);
  const options = tickers.map((item, index) => ({
    key: index,
    text: item.ticker,
    value: item.ticker
  }))
  const dropdown = getByTestId('dropdown')
  const display = dropdown.children[1];
  
  expect(display.textContent).toBe(options[0].text);
})
it("Should allow dropdown options selection",async()=>{

  const options = tickers.map((item, index) => ({
    key: index,
    text: item.ticker,
    value: item.ticker
  }))
  const { getByTestId } = render(<App />);
  const dropdown = getByTestId('dropdown')
  const display = dropdown.children[1];
  fireEvent.click(dropdown);
  const dropdownOptions = screen.getAllByRole('option');
  fireEvent.click(dropdownOptions[2]);
  expect(display.textContent).toBe(options[2].text);
  console.log(display.textContent)
})

// it("Should render chart for option picked on dropdown", async ()=>{
// //American Airlines Group Inc. (AAL) Prices, Dividends, Splits and Trading Volume
//   const { getByTestId } = render(<App />);
//   const dropdown = getByTestId('dropdown')
//   // const display = dropdown.children[1];
//   fireEvent.click(dropdown);
//   const dropdownOptions = screen.getAllByRole('option');
//   fireEvent.click(dropdownOptions[2]);
//   let loadedText =  screen.getByRole('text', {name: 'American Airlines Group Inc. (AAL) Prices, Dividends, Splits and Trading Volume'});
//   expect(loadedText).toBeInTheDocument();
// }, 20000)