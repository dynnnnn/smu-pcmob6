import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Switch,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView
} from "react-native";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import { changeModeAction, deletePicAction, listAction } from "../redux/ducks/accountPref";
import axios from "axios";
import { API, API_WHOAMI } from "../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../redux/ducks/blogAuth";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import profile from '../assets/profile.png';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 




export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState(null);
  const [expanded, setExpanded] = useState(false);
  

  const token = useSelector((state) => state.auth.token);

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const isList = useSelector((state) => state.accountPrefs.isList);
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

  function listMode() {
    dispatch(listAction());
    
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

      { profilePicture ? 
      <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={camera} style={{ paddingRight: 5 }}>
      <MaterialCommunityIcons
            name="pencil-circle"
            size={28}
            color={styles.headerTint}
          /> 
          </TouchableOpacity>

          <TouchableOpacity onPress={deletePicture} style={{ paddingLeft: 5 }}>
          <Ionicons name="close-circle-sharp" size={28} color={styles.headerTint} />
          </TouchableOpacity>

          </View> : 
          <TouchableOpacity onPress={camera} style={{ paddingTop: 15 }}>
          <Text style={[styles.content, styles.text]}>Add Profile Picture</Text>
          </TouchableOpacity>
          
          }

      
    <View style={{ flexDirection: 'row', margin: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 5,
        }}
      >
        <Text style={[styles.content, styles.text]}> Dark Mode? </Text>
        <Switch value={isDark} onValueChange={switchMode} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 5,
        }}
      >
        <Text style={[styles.content, styles.text]}> List View? </Text>
        <Switch value={isList} onValueChange={listMode} />
      </View>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
