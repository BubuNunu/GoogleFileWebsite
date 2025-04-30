import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import theme from './theme';
import Home from './components/Home';
import i18n from './i18n/i18n';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Home />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App;
