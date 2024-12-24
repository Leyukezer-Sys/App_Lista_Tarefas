// App.js
import React from "react";
import { AppProvider } from "./AppContext";
import HomeScreen from "./HomeScreen";

const App = () => {
  return (
    <AppProvider>
      <HomeScreen />
    </AppProvider>
  );
};

export default App;