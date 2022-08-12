import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  const user = userEvent.setup();
  render(<App />);

  //  <<<< add ice cream and toppings
  const Vanilla = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });

  await user.type(Vanilla, '2');
  expect(scoopsSubTotal).toHaveTextContent('4.00');

  const HotFudge = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  const MMS = await screen.findByRole('checkbox', { name: 'M&Ms' });
  const toppingsSubTotal = screen.getByText('Toppings total: $', { exact: false });

  await user.click(HotFudge);
  await user.click(MMS);
  expect(toppingsSubTotal).toHaveTextContent('3.00');

  //  <<<< find and click order button
  const orderSundaeButton = screen.getByRole('button', { name: 'Order Sundae' });
  const headerOrderEntry = screen.getByText('Design Your Sundae');

  await user.click(orderSundaeButton);
  expect(headerOrderEntry).not.toBeInTheDocument();

  const headerSummaryPage = screen.getByRole('heading', { name: /order summary/i });
  expect(headerSummaryPage).toBeInTheDocument();

  //  <<<< check summary information based on order
  // total scoops and total toppings
  const TotalScoops = screen.getByRole('heading', { name: /scoops total: /i });
  expect(TotalScoops).toHaveTextContent('4.00');

  const totalToppings = screen.getByRole('heading', { name: /toppings total: /i });
  expect(totalToppings).toHaveTextContent('3.00');
  // check the list of information
  const VanillaItem = screen.getByText('Vanilla', { exact: false });
  expect(VanillaItem).toHaveTextContent('2');

  const HotFudgeItem = screen.getByText((/1 - hot fudge/i), { exact: false });
  const MMSItem = screen.getByText((/1 - M&Ms/i), { exact: false });
  expect(HotFudgeItem).toBeInTheDocument();
  expect(MMSItem).toBeInTheDocument();

  // // alternatively...
  // // const optionItems = screen.getAllByRole('listitem');
  // // const optionItemsText = optionItems.map((item) => item.textContent);
  // // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  //  <<<< accept terms and conditions and click button to confirm order
  const checkboxTerms = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i });
  await user.click(checkboxTerms);

  //  <<<< confirm order number on confirmation page
  const ConfirmButton = screen.getByRole('button', { name: 'confirm order' });
  await user.click(ConfirmButton);

  expect(headerSummaryPage).not.toBeInTheDocument();

  // check loading spinner appear
  const loadingElement = screen.getByRole('heading', { name: 'loading...' });
  expect(loadingElement).toBeInTheDocument();

  // check thanks header appear
  const titleConfirmPage = await screen.findByText(/thank you!/i);
  expect(titleConfirmPage).toBeInTheDocument();
  expect(loadingElement).not.toBeInTheDocument();
  const orderNumber = await screen.findByText('your order number is', { exact: false });
  await waitFor(() => expect(orderNumber).toHaveTextContent('123456'));

  //  <<<< click new order button on confirm page
  const createNewOrderBtn = screen.getByRole('button', { name: /Create New Order/i });
  await user.click(createNewOrderBtn);
  expect(titleConfirmPage).not.toBeInTheDocument();

  //  <<<< check the scoops and toppings subtotal have been reset
  const scoopsTotal = await screen.findByText(/scoops total: \$0\.00/i);
  expect(scoopsTotal).toBeInTheDocument();
  const toppingTotal = await screen.findByText(/toppings total: \$0\.00/i);
  expect(toppingTotal).toBeInTheDocument();

  //  <<<< do we need to wait anything to avoid test error
});

test.only('Toppings header is not on summary page if no toppings ordered', async () => {
  const user = userEvent.setup();
  render(<App />);

  // add scoops item
  const Vanilla = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.type(Vanilla, '2');

  // find and click order sundae button
  const orderSundaeButton = screen.getByRole('button', { name: 'Order Sundae' });
  await user.click(orderSundaeButton);

  const TotalScoops = screen.getByRole('heading', { name: /scoops total: /i });
  expect(TotalScoops).toHaveTextContent('4.00');

  const TotalToppings = screen.queryByRole('heading', { name: /toppings total: /i });

  expect(TotalToppings).not.toBeInTheDocument();
});
