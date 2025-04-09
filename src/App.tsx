import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Home from './components/Home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Home />
      </div>
    </ThemeProvider>
  );
};

export default App;
