import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Switch,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { changeModeAction, deletePicAction } from "../redux/ducks/accountPref";
import axios from "axios";
import { API, API_WHOAMI } from "../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../redux/ducks/blogAuth";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import profile from '../assets/profile.png';




export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState(null);
  const [expanded, setExpanded] = useState(false);
  

  const token = useSelector((state) => state.auth.token);

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const profilePicture = useSelector(
    (state) => state.accountPrefs.profilePicture
  );
 
  const dispatch = useDispatch();
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  const picSize = new Animated.Value(200);
  

  async function getUsername() {
    console.log("---- Getting user name ----");

    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signOut();
          navigation.navigate("SignInSignUp");
        }
      } else {
        console.log(error);
      }
      // We should probably go back to the login screen???
    }
  }

  function signOut() {
    dispatch(logOutAction());
    navigation.navigate("SignInSignUp");
  }

  function camera() {
    navigation.navigate("Camera");
  }

  function switchMode() {
    dispatch(changeModeAction());
  }

  function changePicSize() {
    Animated.spring(picSize, {
      toValue: 300,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }

  function deletePicture(){
    dispatch(deletePicAction());
  }

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();
    return removeListener;
  }, []);

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={[styles.title, styles.text, { marginTop: 30 }]}>
        {" "}
        Hello {username} !
      </Text>
      
<View style={{ height: 320, justifyContent: 'center' }}>
      {profilePicture == null ? <Image
          source={ profile }
          style={{ width: 300, height: 300, borderRadius: 200 }}
        /> : 
        <TouchableWithoutFeedback onPress={changePicSize}>
        <Animated.Image
          source={{ uri: profilePicture?.uri }}
          style={{ width: picSize, height: picSize, borderRadius: 200 }}
        /></TouchableWithoutFeedback>
      }</View>

      <TouchableOpacity onPress={camera}>
        <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}>
          {profilePicture
            ? "Change Profile Picture"
            : "No Profile Picture. Click to take one!"}
        </Text>
      </TouchableOpacity>
      {profilePicture ? (
        <View>
          <TouchableOpacity onPress={deletePicture}>
            <Text style={{ marginTop: 10, fontSize: 20, color: "#0000EE" }}>Delete Profile Picture</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Text style={[styles.content, styles.text]}> Dark Mode? </Text>
        <Switch value={isDark} onValueChange={switchMode} />
      </View>
      <TouchableOpacity style={[styles.button]} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
