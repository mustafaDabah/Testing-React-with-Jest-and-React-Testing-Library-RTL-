import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { screen, render, waitFor } from '../../../test-utils/testing-library-utilies';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';

test('handles error for scoops and topping', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500))),
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable button order sunday when no scoops items', async () => {
  const user = userEvent.setup();
  render(<OrderEntry />);

  const orderSundayBtn = screen.getByRole('button', { name: /Order Sundae/i });
  expect(orderSundayBtn).toBeDisabled();

  const Vanilla = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  await user.clear(Vanilla);
  await user.type(Vanilla, '2');

  expect(orderSundayBtn).toBeEnabled();

  await user.clear(Vanilla);
  await user.type(Vanilla, '0');
  expect(orderSundayBtn).toBeDisabled();
});
