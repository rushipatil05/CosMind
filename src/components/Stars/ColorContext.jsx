// ColorContext.js
import { createContext } from 'react';

const ColorContext = createContext({
  color: 0x00ffff,
  setColor: () => {},
});

export default ColorContext;
