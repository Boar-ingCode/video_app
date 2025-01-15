import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/(tabs)/Home";
import SettingsScreen from "./app/(tabs)/Settings";

export type RootStackParamList = {
  Home: undefined;          
  Settings: undefined;     
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen 
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}