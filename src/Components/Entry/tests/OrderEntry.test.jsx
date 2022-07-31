import { rest } from 'msw';
import { screen, render, waitFor } from '../../../test-utils/testing-library-utilies';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';

test('handles error for scoops and topping', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500))),
  );

  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});
