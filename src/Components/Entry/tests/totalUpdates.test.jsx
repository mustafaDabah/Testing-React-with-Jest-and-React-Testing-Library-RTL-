import userEvent from '@testing-library/user-event';
import { findByRole, render, screen } from '../../../test-utils/testing-library-utilies';
import GrandTotalEntry from '../GrandTotalEntry';
import Optional from '../Optional';
import OrderEntry from '../OrderEntry';

// const render = (component) => rtlRender(
//   <OrderDetailsProvider>
//     {component}
//   </OrderDetailsProvider>,

// );

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Optional optionsType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false, ignore: 'script, style' });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings changes', async () => {
  const user = userEvent.setup();
  render(<Optional optionsType="toppings" />);

  // get toppings element and examine it
  const toppingSubtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  // get cherries element and check it
  const cherries = await screen.findByRole('checkbox', { name: 'Cherries' });
  // expect total 0.00
  expect(cherries).not.toBeChecked();
  expect(toppingSubtotal).toHaveTextContent('0.00');
  // expect total 1.50 when click checkbox
  await user.click(cherries);
  expect(toppingSubtotal).toHaveTextContent('1.50');
  // expect total 0.00 when uncheck
  await user.click(cherries, { target: false });
  expect(cherries).not.toBeChecked();
  await expect(toppingSubtotal).toHaveTextContent('0.00');

  const MMS = await screen.findByRole('checkbox', { name: 'M&Ms' });
  // expect total 1.50 when click checkbox
  await user.click(MMS);
  expect(toppingSubtotal).toHaveTextContent('1.50');

  await user.click(MMS);
  expect(toppingSubtotal).toHaveTextContent('0.00');

  await user.click(cherries);
  await user.click(MMS);

  expect(toppingSubtotal).toHaveTextContent('3.00');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<GrandTotalEntry />);
    const grandTotal = screen.getByText('grand total: $', { exact: false });
    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly if scoops is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // get the elements
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    const grandTotal = screen.getByText('grand total: $', { exact: false });
    // make the events
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '1');

    expect(grandTotal).toHaveTextContent('2.00');
  });
  test('grand total updates properly if toppings is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByText('grand total: $', { exact: false });
    const cherries = await screen.findByRole('checkbox', { name: 'Cherries' });

    await user.click(cherries);
    expect(grandTotal).toHaveTextContent('1.50');
  });
  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // get the all elements
    const grandTotal = screen.getByText('grand total: $', { exact: false });
    const cherries = await screen.findByRole('checkbox', { name: 'Cherries' });
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

    // expect grand total 2.00
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '1');

    await expect(grandTotal).toHaveTextContent('2.00');
    // expect grand total 0.00
    await user.type(chocolateInput, '0');
    await expect(grandTotal).toHaveTextContent('0.00');

    // expect grand total 1.50
    await user.click(cherries);
    expect(grandTotal).toHaveTextContent('1.50');

    // expect grand total 0.00
    await user.click(cherries);
    expect(grandTotal).toHaveTextContent('0.00');
  });
});
