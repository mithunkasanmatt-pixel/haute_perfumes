import React, { createContext, useContext, useState } from 'react';

const QuickViewContext = createContext(null);

export const QuickViewProvider = ({ children }) => {
  const [activeProduct, setActiveProduct] = useState(null);

  const openQuickView = (product) => {
    setActiveProduct(product);
  };

  const closeQuickView = () => {
    setActiveProduct(null);
  };

  return (
    <QuickViewContext.Provider
      value={{
        activeProduct,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within QuickViewProvider');
  }
  return context;
};
