import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CreateCounterDoctor from "./doctors/CreateCounterDoctor";
import Doctors from "./doctors/Doctors";
import StatsionarDoctors from "./doctors/StatsionarDoctors";

export const CounterAgentRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/alo24" exact>
                    <CreateCounterDoctor />
                </Route>
                <Route path="/alo24/counter_doctors_report" exact>
                    <Doctors />
                </Route>
                <Route path="/alo24/statsionar_doctors_report" exact>
                    <StatsionarDoctors />
                </Route>
                <Redirect to="/alo24" />
            </Switch>
        </div>
    );
};