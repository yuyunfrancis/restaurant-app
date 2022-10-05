import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen, OnBoardScreen } from "../views";
import BottomNavigator from "./BottomNavigator";
import COLORS from "../constants/colors";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const ScreenNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigator;
