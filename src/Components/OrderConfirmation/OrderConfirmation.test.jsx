import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { waitFor } from '@testing-library/react';
import { render, screen } from '../../test-utils/testing-library-utilies';
import { server } from '../../mocks/server';
import OrderConfirmation from './OrderConfirmation';

test('make test at fail the reuest API', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/order', (req, res, ctx) => res(ctx.status(500))),
  );
  render(<OrderConfirmation />);
  await waitFor(async () => {
    const alerts = await screen.findByRole('alert');
    expect(alerts).toBeInTheDocument(2);
  });
});
