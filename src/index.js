// require('dotenv').config({path: '../.'});
require('dotenv').load();
import React from "react";
import ReactDOM from "react-dom";
import 'babel-polyfill';

import Routes from './routes/index.js';

const App = () => {
  return (
    <div>
      <Routes />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));