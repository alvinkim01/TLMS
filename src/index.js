import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
    useNextVariants: true,
    fontFamily: '"Noto Sans KR"'
    }
    });

ReactDOM.render(<MuiThemeProvider theme={theme}>  
<Router>
    <App />
</Router>
</MuiThemeProvider>, document.getElementById('root'));