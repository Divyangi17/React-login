import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/login';
import Home from './pages/home';
import Signup from './pages/signup';
import Navbar from "./components/Navbar";
import themeObject from './util/theme';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
// import { logoutUser, getUserData } from './redux/actions/userActions';
import { logoutUser} from './redux/actions/userActions';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { MuiThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core';

import jwtDecode from 'jwt-decode';
import axios from 'axios';

const theme = createTheme(themeObject);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    // store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Router>
              <Navbar/>
              <div className="container">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
              </Routes>
              </div>
            
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
  
}

export default App;
