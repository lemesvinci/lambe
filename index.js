import React from "react";
import { Provider } from "react-redux";
import { registerRootComponent } from "expo";

import Navigator from "./src/Navigator";
import storeConfig from "./src/store/storeConfig";

import axios from "axios";
axios.defaults.baseURL = "https://lambe-e5f0c-default-rtdb.firebaseio.com/";

const store = storeConfig();
const Redux = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Redux);