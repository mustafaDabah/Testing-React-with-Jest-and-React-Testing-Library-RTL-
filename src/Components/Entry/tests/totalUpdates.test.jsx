import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utilies';
import Optional from '../Optional';

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
  user.clear(vanillaInput);
  user.type(vanillaInput, { target: { value: '1' } });
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
