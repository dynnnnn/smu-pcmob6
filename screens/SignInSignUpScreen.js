import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  ActivityIndicator,
  Keyboard,
  LayoutAnimation
} from "react-native";
import { API, API_LOGIN, API_SIGNUP } from "../constants/API";

import axios from "axios";
import IndexScreen from "./IndexScreen";
import { useDispatch } from "react-redux";
import { logInAction } from "../redux/ducks/blogAuth";



if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
} //Needs to be manually enabled for android

export default function SignInSignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLogIn, setIsLogIn] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!");
      console.log(response.data.access_token);
      dispatch({ ...logInAction(), payload: response.data.access_token });
      setLoading(false);
      setUsername("");
      setPassword("");
      navigation.navigate("Logged In");
    } catch (error) {
      setLoading(false);
      console.log("Error logging in!");
      console.log(error);
      setErrorText(error.response.data.description);
      if ((error.response.status = 404)) {
        setErrorText("User does not exist");
      }
    }
  }
  async function signUp() {
    if (password != confirmPassword) {
      setErrorText("Your passwords don't match. Check and try again.")
    } else {
      try {
        setLoading(true);
        const response = await axios.post(API + API_SIGNUP, {
          username,
          password,
        });
        if (response.data.Error) {
          // We have an error message for if the user already exists
          setErrorText(response.data.Error);
          setLoading(false);
        } else {
          console.log("Success signing up!");
          setLoading(false);
          login();
          navigation.navigate("Logged In")
        }
      } catch (error) {
        setLoading(false);
        console.log("Error logging in!");
        console.log(error.response);
        setErrorText(error.response.data.description);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogIn ? "Log In" : "Sign Up"}
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Username:"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password:"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(pw) => setPassword(pw)}
        />
      </View>
      <View />
      {isLogIn ? (
        <View />
      ) : (
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password:"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(pw) => setConfirmPassword(pw)}
          />
        </View>
      )}
      <View>
        <View>
          <TouchableOpacity style={styles.button} onPress={ isLogIn ? login : signUp}>
          <TouchableOpacity style={styles.button} onPress={ isLogIn ? login : signUp}></TouchableOpacity>
            <Text style={styles.buttonText}>
              {isLogIn ? "Log In" : "Sign Up"}{" "}
            </Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator style={{ marginTop: 30 }} />
          ) : (
            <View />
          )}
        </View>
      </View>
      <Text style={styles.errorText}>{errorText}</Text>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext({
            duration: 700,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'spring', springDamping: 0.4 }
          });
          setIsLogIn(!isLogIn);
          setErrorText("");
        }}
      >
        <Text style={styles.switchText}>
          {" "}
          {isLogIn
            ? "No account? Sign up now."
            : "Already have an account? Log in here."}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    margin: 20,
  },
  switchText: {
    fontWeight: "400",
    fontSize: 20,
    marginTop: 20,
  },
  inputView: {
    backgroundColor: "#efefef",
    borderRadius: 10,
    width: 300,
    height: 45,
    marginBottom: 30,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    
  },
  buttonText: {
    fontWeight: "400",
    fontSize: 15,
    margin: 15,
    color: "white",
  },
  errorText: {
    fontSize: 15,
    color: "red",
    marginTop: 20,
  },
});
