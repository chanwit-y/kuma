import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { createContext, ReactNode, useContext } from "react";

type ThemeContextType = {};
const ThemeContext = createContext<ThemeContextType>(
	{} as ThemeContextType
);

type Props = {
	children: ReactNode;
};


const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					input: {
						padding: 8,
						paddingLeft: 10,
						paddingRight: 10,
						fontSize: 14,

					}
				},
			}
		},
		MuiSelect: {
			styleOverrides: {
			},
		}
	}
});

const ThemeProvider = ({ children }: Props) => {
	return (
		<ThemeContext.Provider value={{}}>
			<MuiThemeProvider theme={theme}>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
