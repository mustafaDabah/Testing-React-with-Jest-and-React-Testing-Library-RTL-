import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utilies';
import ScoopEntry from '../ScoopEntry';

test('indicate if scoop count is non-int or out of range', async () => {
  const user = userEvent.setup();
  render(<ScoopEntry updateItemCount={jest.fn()} />);

  const vanillaInput = screen.getByRole('spinbutton');
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
