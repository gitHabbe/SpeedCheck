// require('dotenv').config({path: '../.'});
require('dotenv').load();
import React from "react";
import ReactDOM from "react-dom";
import 'babel-polyfill';

import Routes from './routes/index.js';

import Navbar from './components/navbar.js';
import Footer from './components/footer.js';
import LapCalculator from './components/lap_calculator.js'

const App = () => {
  return (
    <div>
      <Routes />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
