import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LapCalculator from '../components/lap_calculator.js';
import SpeedComp from '../components/speedcomp.js';
import PaddyBoard from '../components/paddy_board.js';
import TTBox from '../components/tt_box.js';
import Navbar from '../components/navbar.js';
import Footer from '../components/footer.js';
import Images from '../components/images.js';
import Home from '../components/home.js';
import TypeChart from '../components/type_chart.js';
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
                    <Route exact path="/ttbox" render={(props) => <TTBox />} />
                    <Route exact path="/images" render={(props) => <Images />} />
                    <Route exact path="/types" render={(props) => <TypeChart />} />
                </Switch>
            </div>
            {/* <Footer /> */}
        </div>
    </BrowserRouter>
)