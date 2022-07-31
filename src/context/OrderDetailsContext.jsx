import { useEffect, createContext, useContext, useMemo, useState } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../uttitlties';

const zeroCurrency = formatCurrency(0);

const OrderDetails = createContext();

export function useOrderDetailsContext() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within an orderDetailsProvider');
  }

  return context;
}

export function calculateSubtotal(optionalType, optionalCounts) {
  let optionalCount = 0;
  for (const count of optionalCounts[optionalType].values()) {
    optionalCount += count;
  }

  return optionalCount * pricePerItem[optionalType];
}

export function OrderDetailsProvider({ children }) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [total, setTotal] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotal({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountMap = optionCounts[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount, 10));

      setOptionCounts(newOptionCounts);
    }

    return [{ ...optionCounts }, total, updateItemCount];
  }, [optionCounts, total]);

  return (
    <OrderDetails.Provider value={value}>
      {children}
    </OrderDetails.Provider>
  );
}
