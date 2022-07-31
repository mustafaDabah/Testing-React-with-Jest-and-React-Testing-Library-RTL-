import './App.css';
import Optional from './Components/Entry/Optional';
import OrderEntry from './Components/Entry/OrderEntry';
import SummeryForm from './Components/SummaryPage/SummeryForm';
import { OrderDetailsProvider } from './context/OrderDetailsContext';

function App() {
  return (
    <div className="App">
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
      <SummeryForm />
    </div>
  );
}

export default App;

