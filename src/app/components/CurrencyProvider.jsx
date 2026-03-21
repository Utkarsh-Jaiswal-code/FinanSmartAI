"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import formatNumber from '../../../utils/index';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    // Load currency preference from localStorage
    const savedCurrency = localStorage.getItem('userCurrency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('userCurrency', newCurrency);
  };

  const formatCurrency = (amount) => {
    const numAmount = Number(amount);
    // Convert to INR if selected (1 USD = 94 INR)
    const convertedAmount = currency === 'INR' ? numAmount * 94 : numAmount;
    const symbol = currency === 'INR' ? '₹' : '$';
    return `${symbol}${formatNumber(convertedAmount)}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency: updateCurrency,
      formatCurrency
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};