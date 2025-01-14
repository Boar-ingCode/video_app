import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native";
import * as Font from "expo-font";

import MainPage from "./app/(tabs)";

const App: React.FC = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
  
    useEffect(() => {
      const loadFonts = async () => {
        await Font.loadAsync({
          Poppins: require("./assets/fonts/Poppins-Regular.ttf"), // Add your Poppins font
        });
        setFontsLoaded(true);
      };
  
      loadFonts();
    }, []);
  
    if (!fontsLoaded) {
      return <ActivityIndicator size="large" />; // Show a loading indicator while fonts load
    }
  
    return <MainPage />;
  };
  
  export default App;