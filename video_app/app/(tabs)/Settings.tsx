import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import LeftArrow from "../../assets/icons/leftarrow-icon.svg";
import User from "../../assets/icons/person-icon.svg";
import Notification from "../../assets/icons/notification-icon.svg";
import Clock from "../../assets/icons/clock-icon.svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App"; 

type SettingsNavProp = NativeStackNavigationProp<RootStackParamList, "Settings">;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavProp>();

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.leftArrow}
          onPress={() => navigation.navigate("Home")}
        >
          <LeftArrow width={32} height={32} />
        </TouchableOpacity>
        <Text style={styles.headingSetting}>Settings</Text>
      </View>
      <View style={styles.userRow}>
        <View style={styles.iconWrapper}>
                <User width={20} height={20} stroke={"#FFF"} fill={"#FFF"}/>
        </View>
            <Text style={styles.userName}>John Doe</Text>
      </View>
       <View style={styles.divider} />
       <View style={styles.topRowNotification}>
          <Notification width={32} height={32} />
        <Text style={styles.headingNotification}>Learning Remainders</Text>
      </View>
      <View style={styles.topRowNotificationTime}>
            <Text style={[styles.headingNotificationTime, { marginRight: 10 }]}>
                Repeat everyday at:
            </Text>
            <View style={{ marginRight: 10 }}>
                <Clock width={24} height={24} />
            </View>
            <Text style={styles.headingNotificationTime}>12:00</Text>
                {/* Toggle button */}
                <Switch
                        trackColor={{ false: "#767577", true: "#2B2D42" }} 
                        thumbColor={isEnabled ? "#FFF" : "#FFF"}          
                        ios_backgroundColor="#3e3e3e"                    
                        onValueChange={toggleSwitch}                      
                        value={isEnabled}                                 
                        style={styles.switch}
                    />
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 16,
  },
  leftArrow: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  headingSetting: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    fontWeight: 600,
    color: "#2B2D42",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 60, 
  },
  userName: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#2B2D42",
    marginLeft: 10,
  },
  iconWrapper:{
        width: 48,
        height: 48,
        borderRadius: 50,            
        backgroundColor: "#2B2D42",   
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
  },
  divider: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 15,
  },
  topRowNotification: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 15,
  },
  headingNotification:{
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    fontWeight: 600,
    color: "#2B2D42",
    paddingHorizontal:15
  },
  topRowNotificationTime:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical:10,
  },
  headingNotificationTime:{
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    fontWeight: 600,
    color: "#2B2D42",
    paddingHorizontal:15
  },
  switch: {
    marginLeft: 15, 
}});
