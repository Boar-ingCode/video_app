import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Main: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Main">;

const MainPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigate = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/firstPage/logo.png")} 
          style={styles.logoStyle}
        />
      </View>

      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/firstPage/app-icon.png")}
          style={styles.icon}
        />
      </View>

      {/* Welcome Text */}
      <View style={styles.welcomeTextContainer}>
      <Text style={styles.welcomeText}>
        Welcome to the best YouTube-based learning application.
      </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Log in as guest</Text>
      </TouchableOpacity>

      {/* Footer Text */}
      <Text style={styles.footerText}>
        By continuing you agree with{" "}{"\n"}
        <Text style={styles.linkText}>Terms and Conditions</Text>{" "}
        and
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8D99AE",
    alignItems: "center",
    justifyContent: "space-between", 
    paddingVertical: 40,
  },
  logoContainer: {
    marginTop: 20,
  },
  logoStyle: {
    width: 292,
    height: 116,
  },
  iconContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  },
  icon: {
    width: 128,
    height: 128,
  },
  welcomeTextContainer: {
    width: 327, 

  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
    lineHeight: 28,
    marginBottom: 30,
  },
  
  button: {
    backgroundColor: "#2B2D42",
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 12,
    width: 327,
    alignItems: "center", 
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontFamily: "Poppins",
    textAlign: "center",
    lineHeight: 16,
    marginTop:30.
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#2B2D42",
  },
});

export default MainPage;
