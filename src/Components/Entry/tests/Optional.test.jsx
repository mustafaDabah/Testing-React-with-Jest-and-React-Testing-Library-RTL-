import { render, screen } from '../../../test-utils/testing-library-utilies';
import { OrderDetailsProvider } from '../../../context/OrderDetailsContext';
import Optional from '../Optional';

test('displays images for each scoops', async () => {
  render(<Optional optionsType="scoops" />);
  // get elements
  const images = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(images).toHaveLength(2);
  const textAlt = images.map((el) => (el.alt));
  expect(textAlt).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays images for each toppings', async () => {
  render(<Optional optionsType="toppings" />);

  // get elements
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  const textAlt = images.map((el) => el.alt);
  expect(textAlt).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
