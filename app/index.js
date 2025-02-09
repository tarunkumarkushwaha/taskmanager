import { Image, StyleSheet } from "react-native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const goTasks = () => {
    navigation.navigate("tasks");
  };

  const goToAboutPage = () => {
    navigation.navigate("about");
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require("../assets/images/color.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.overlay} />
      <Text style={styles.logoText}>T</Text>
      <Text style={styles.logoText}>task manager</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          A powerful taskmanager on the go.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goTasks} style={styles.startButton}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
  
        <TouchableOpacity onPress={goToAboutPage} style={styles.aboutButton}>
          <Text style={styles.aboutButtonText}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    textShadow: "3px 3px 3px #ffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "linear-gradient(90deg, #FFD700, #FFFFCC)",
  },

  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.75)",
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
  },
  startButton: {
    backgroundColor: "#ffff",
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
    marginBottom: 10,
  },
  aboutButton: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
  },
  aboutButtonText: {
    color: "white",
    textDecorationLine: "underline",
    fontSize: 14,
    fontWeight: "bold",
  },
});