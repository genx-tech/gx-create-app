import React from 'react';
import { StaticRoutes } from '@genx/react';
import bookingRoutes from './routes';

export { default as config } from './config';

export default () => <StaticRoutes {...bookingRoutes} />;
