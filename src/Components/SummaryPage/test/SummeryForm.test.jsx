import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utilies';
import SummeryForm from '../SummeryForm';

test('write test to ensure checkbox works well', async () => {
  const user = userEvent.setup();
  render(<SummeryForm />);
  // get the elements
  const checkboxBtn = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i });
  const btnConfirm = screen.getByRole('button', { name: 'confirm order' });

  // ensure checkbox btn at first render not checked and confirm btn disabled
  expect(checkboxBtn).not.toBeChecked();
  expect(btnConfirm).toBeDisabled();

  // ensure check button will make btn confirm enable
  await user.click(checkboxBtn);
  expect(btnConfirm).toBeEnabled();

  // ensure that unchecked btn will be disable the confirm btn
  await user.click(checkboxBtn);
  expect(btnConfirm).toBeDisabled();
});

test('popover response at hover', async () => {
  render(<SummeryForm />);
  const user = userEvent.setup();

  // popover is not appear at first
  const nullPopover = screen.queryByText(/no ice cream will actually deliver /i);

  expect(nullPopover).not.toBeInTheDocument();
  // when mouse over the popover will appear
  const termsAndCondition = screen.getByText(/Terms and Conditions/i);
  await user.hover(termsAndCondition);
  const popover = screen.getByText(/no ice cream will actually deliver/i);
  expect(popover).toBeInTheDocument();

  // when mouse out the popover will not appear

  await user.unhover(termsAndCondition);
  expect(nullPopover).not.toBeInTheDocument();
});
