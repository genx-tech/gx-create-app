import React from "react";
import { Runtime, AppContainer, registerLocale, StaticRoutes, withObserver } from "@genx/react";

import appRoutes from "routes/app";
import initLocale from "assets/locale";

Runtime.update({
    useNativeStack: true,
}).finalize();

Runtime.setLogLevel("debug");

initLocale(registerLocale);

const App = ({}) => {
    return (
        <AppContainer locale={"en-AU"}>
            <StaticRoutes {...appRoutes} />
        </AppContainer>
    );
};

export default withObserver({ appStore })(App);
