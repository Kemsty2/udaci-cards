import * as React from "react";
import Setup from "./src/boot";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Setup />
    </SafeAreaProvider>
  );
}
