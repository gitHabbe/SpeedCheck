import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LapCalculator from '../components/lap_calculator.js';
import Navbar from '../components/navbar.js';
import Footer from '../components/footer.js';
import Home from '../components/home.js';

export default () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/lap-calculator" render={() => <LapCalculator />} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
)