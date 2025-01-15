
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LeftArrow from "../../assets/icons/leftarrow-icon.svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App"; 

type SettingsNavProp = NativeStackNavigationProp<RootStackParamList, "Settings">;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavProp>();

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.leftArrow}
          onPress={() => navigation.navigate("Home")}
        >
          <LeftArrow width={32} height={32} />
        </TouchableOpacity>
        <Text style={styles.headingSetting}>Settings</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  rowContainer: {
    top: 50,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headingSetting: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#2B2D42",
    padding: 20,
  },
  leftArrow: {
    width: 32,
    height: 32,
  },
});
