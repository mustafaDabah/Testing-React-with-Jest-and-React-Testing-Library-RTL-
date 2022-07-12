import { useState } from 'react';
import './App.css';

export function replaceCamelWithSpaces(colorName, isCapitalCase = true) {
  const newColor = colorName.replace(/\B([A-Z])\B/g, ' $1');
  const whichCase = isCapitalCase ? colorName : newColor;

  return whichCase;
}

export function Ali() { }

function App() {
  const [toggleColor, setToggleColor] = useState(false);
  const [checkButtonEnable, setCheckButtonEnable] = useState(false);
  const contentButton = toggleColor ? `Change to ${replaceCamelWithSpaces('MidnightBlue')}` : `Change to ${replaceCamelWithSpaces('MediumVioletRed')}`;
  const checkColorBtnRedOrBlue = toggleColor ? replaceCamelWithSpaces('MediumVioletRed') : replaceCamelWithSpaces('MidnightBlue');
  const checkGrayColorBtn = !checkButtonEnable ? checkColorBtnRedOrBlue : 'gray';

  // functions
  const changeColor = () => setToggleColor(!toggleColor);

  return (
    <div className="App">
      <button type="button" style={{ backgroundColor: checkGrayColorBtn }} onClick={changeColor} disabled={checkButtonEnable}>
        {contentButton}
      </button>

      <label htmlFor="checkbox-disable">disable button
        <input
          type="checkbox"
          id="checkbox-disable"
          defaultChecked={checkButtonEnable}
          aria-checked={checkButtonEnable}
          onChange={() => setCheckButtonEnable(!checkButtonEnable)}
        />
      </label>
    </div>
  );
}

export default App;
/*

*/
