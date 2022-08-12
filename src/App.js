import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import Optional from './Components/Entry/Optional';
import OrderEntry from './Components/Entry/OrderEntry';
import OrderSummary from './Components/SummaryPage/OrderSummary';
import SummeryForm from './Components/SummaryPage/SummeryForm';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import { OrderDetailsProvider } from './context/OrderDetailsContext';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');
  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <div className="App">
      <OrderDetailsProvider>
        <Container>
          <Component setOrderPhase={setOrderPhase} />
        </Container>
      </OrderDetailsProvider>
    </div>
  );
}

export default App;

