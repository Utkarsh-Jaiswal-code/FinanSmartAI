"use client";

import React from 'react';
import { useCurrency } from '@/app/components/CurrencyProvider';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency-select" className="text-sm font-medium text-gray-700">
        Currency:
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={handleCurrencyChange}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="USD">USD ($)</option>
        <option value="INR">INR (₹)</option>
      </select>
    </div>
  );
};

export default CurrencySelector;