import React, { createContext, useContext, ReactNode } from 'react';

interface ColorContextProps {
  primary: string;
  secondary: string;
  tertiary: string;
}

const ColorContext = createContext<ColorContextProps>({
  primary: '#1976d2',
  secondary: '#dc004e',
  tertiary: '#ffa726',
});

export const useColors = () => useContext(ColorContext);

interface ColorProviderProps {
  children: ReactNode;
}

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const colors = {
    primary: '#1976d2',
    secondary: '#dc004e',
    tertiary: '#ffa726',
    whiteColor:'#fffefc',
  };

  return (
    <ColorContext.Provider value={colors}>
      {children}
    </ColorContext.Provider>
  );
};
