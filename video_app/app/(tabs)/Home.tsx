import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import SearchIcon from "../../assets/icons/search-icon.svg"; 
import SettingsIcon from "../../assets/icons/settings-icon.svg"; 

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* Search Icon */}
        <SearchIcon width={24} height={24}/>
        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Search videos"
          placeholderTextColor="#AAB0C6"
        />
        {/* Settings Icon */}
        <TouchableOpacity>
          <SettingsIcon width={24} height={24}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#AAB0C6",
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    marginLeft: 10,
  },
});

export default HomeScreen;
