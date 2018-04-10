import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LapCalculator from '../components/lap_calculator.js';
import SpeedComp from '../components/speedcomp.js';
import PaddyBoard from '../components/paddy_board.js';
import TTBoard from '../components/tt_board.js';
import Navbar from '../components/navbar.js';
import Footer from '../components/footer.js';
import Home from '../components/home.js';
import style from '../style/style.css'

export default () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <div className={style.content}>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/lap-calculator" render={(props) => <LapCalculator />} />
                    <Route exact path="/speedcomp" render={(props) => <SpeedComp />} />
                    <Route exact path="/paddyboard" render={(props) => <PaddyBoard />} />
                    <Route exact path="/ttlb" render={(props) => <TTBoard />} />
                </Switch>
            </div>
            <Footer />
        </div>
    </BrowserRouter>
)