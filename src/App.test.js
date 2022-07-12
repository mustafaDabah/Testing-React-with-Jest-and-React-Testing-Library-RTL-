import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
  render(<App />);
  // find element with role button and text change color to blue
  const colorButton = screen.getByRole('button', {
    name: 'Change to MediumVioletRed',
  });

  // expect background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'Midnight Blue' });

  // click button
  fireEvent.click(colorButton);

  // expect background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'Medium Violet Red' });

  // expect to change text to be change color to red
  expect(colorButton).toHaveTextContent('Change to MidnightBlue');
});

test('checkbox condition', () => {
  render(<App />);

  // get the button
  const colorButton = screen.getByRole('button');

  // expect element to be enable
  expect(colorButton).toBeEnabled();

  // get the checkbox
  const checkboxEnable = screen.getByRole('checkbox', {
    name: 'disable button',
  });

  expect(checkboxEnable).not.toBeChecked();
});

test('checkbox disable button at first and enable button at second', () => {
  render(<App />);

  // get the button
  const colorButton = screen.getByRole('button');

  // get the checkbox
  const checkboxEnable = screen.getByRole('checkbox', {
    name: 'disable button',
  });

  // check checkbox to be disable
  fireEvent.click(checkboxEnable, {
    target: { checked: true },
  });

  // expect color button disable
  expect(colorButton).toBeDisabled();

  // check checkbox to be enable
  fireEvent.click(checkboxEnable, {
    target: { checked: false },
  });

  expect(colorButton).toBeEnabled();
});

test('check button color gray when btn is blue', () => {
  render(<App />);

  // get the elements
  const colorButton = screen.getByRole('button', {
    name: 'Change to MediumVioletRed',
  });
  const checkbox = screen.getByRole('checkbox', { name: 'disable button' });

  // click at checkbox
  fireEvent.click(checkbox);

  // expect color to be grey
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  // click at checkbox
  fireEvent.click(checkbox);

  // expect color to be grey
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

test('check button color gray when btn is red', () => {
  render(<App />);
  // get the elements
  const checkbox = screen.getByRole('checkbox', { name: 'disable button' });
  const colorButton = screen.getByRole('button', {
    name: 'Change to MediumVioletRed',
  });

  // change color to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);

  // expect color to be grey
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  // enable button
  fireEvent.click(checkbox);

  // expect color to be grey
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

describe('spaces before camel case  capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('works for one inner capital letters', () => {
    expect(replaceCamelWithSpaces('MidnightBlue', false)).toBe('Midnight Blue');
  });
  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed', false)).toBe(
      'Medium Violet Red',
    );
  });
  test('works with capital case MidnightBlue', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('MidnightBlue');
  });
  test('works with capital case MediumVioletRed', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('MediumVioletRed');
  });
});
