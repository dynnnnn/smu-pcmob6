import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInSignUpScreen from "./screens/SignInSignUpScreen";
import LoggedInStack from "./components/LoggedInTabStack";
import { Provider, useSelector } from "react-redux";
import store from "./redux/configureStore";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

function App() {
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark)
  console.log(token);
  return (
    <NavigationContainer>
    <StatusBar style={ isDark ? "light" : "dark"} />
       <Stack.Navigator
          mode="modal"
          headerMode="none"
          initialRouteName={token != null ? "Logged In" : "SignInSignUp"}
          animationEnabled={false} screenOptions={{
          headerShown: false,
          headerMode: "none",
        }}>
        <Stack.Screen component={SignInSignUpScreen} name="SignInSignUp" />
        <Stack.Screen component={LoggedInStack} name="Logged In" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
