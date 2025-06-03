// DrawingContext.js
import React, { createContext, useContext, useState } from 'react';

const DrawingContext = createContext();

export const DrawingProvider = ({ children }) => {
  const [startPolygonDrawing, setStartPolygonDrawing] = useState(false);

  return (
    <DrawingContext.Provider value={{ startPolygonDrawing, setStartPolygonDrawing }}>
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawing = () => useContext(DrawingContext);
