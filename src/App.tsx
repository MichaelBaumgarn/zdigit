import * as React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import DashBoard from "./DashBoard";

function App() {
  return (
    <ChakraProvider>
      <DashBoard />
    </ChakraProvider>
  );
}

export default App;
