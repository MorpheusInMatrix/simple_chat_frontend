import React, { useState } from "react";
import ShoppingAssistant from "./ShoppingAssistant";
import SearchingResult from "./SearchingResult";

const ShoppingApp = () => {
  const [isResultPage, setIsResultPage] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  if (!isResultPage) {
    return (
      <ShoppingAssistant
        setIsResultPage={setIsResultPage}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    );
  } else {
    return <SearchingResult handleOnBack={() => setIsResultPage(false)} />;
  }
};

export default ShoppingApp;
