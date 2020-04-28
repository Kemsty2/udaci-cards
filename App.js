import * as React from "react";
import Setup from "./src/boot";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./src/redux/reducers";

const store = createStore(allReducers);

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Setup />
      </Provider>
    </SafeAreaProvider>
  );
}
