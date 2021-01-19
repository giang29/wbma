import React from 'react';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContext';

const App = () => (
  <MainProvider>
    <Navigator/>
  </MainProvider>
);

export default App;
