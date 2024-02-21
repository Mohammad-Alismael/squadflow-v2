// import "@tamagui/core/reset.css";
import React from "react";
import { TamaguiProvider } from "tamagui";
import appConfig from "./tamagui.config";
import { AuthProvider } from "./utils/context/AuthContext";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <AuthProvider>
      <TamaguiProvider config={appConfig}>
        <RootLayout />
      </TamaguiProvider>
    </AuthProvider>
  );
}

export default App;
