import React from 'react';
import {
    Runtime,
    AppContainer,
    registerLocale,
    AppNavigator,
} from '@genx/react';

import appRoutes from 'routes/app';
import initLocale from 'assets/locale';

//import add-ons
import '@genx/react/addons/navigations/stackNative';
import '@genx/react/addons/navigations/bottomTabNative';
import '@genx/react/addons/navigations/topTabMaterial';

Runtime.setLogLevel('debug');

initLocale(registerLocale);

const App = ({}) => {
    return (
        <AppContainer locale={'en-AU'}>
            <AppNavigator {...appRoutes} />
        </AppContainer>
    );
};

export default App;
