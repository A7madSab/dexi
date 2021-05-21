import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const light = { syntax: '#555', ui: '#ddd', bg: '#eee', div: "light-div" }
const dark = { sytax: '#ddd', ui: '#333', bg: '#555', div: "dark-div" }

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        isLightTheme: true,
    })

    const toggleTheme = () => {
        setTheme({
            isLightTheme: !theme.isLightTheme
        });
    }

    return (
        <ThemeContext.Provider value={{ light, dark, theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;