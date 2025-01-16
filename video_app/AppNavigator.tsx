import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/(tabs)/Home";
import VideoPlayerScreen from "./app/(tabs)/VideoPlayerScreen";
import SettingsScreen from "./app/(tabs)/Settings";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  VideoPlayer: { videoPath: string }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
    </Stack.Navigator>
  );
}
