import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  SafeAreaView,
  Alert,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, API_POSTS } from "../constants/API";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 

export default function IndexScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const idRef = useRef();

  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const image = useSelector((state) => state.addpic.image);
  const isList = useSelector((state) => state.accountPrefs.isList);

  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addPost}>
          <AntDesign
            name="pluscircle"
            size={30}
            style={{ color: styles.headerTint, marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      getPosts();
    });
    getPosts();
    return removeListener;
  }, []);

  async function getPosts() {
    try {
      const response = await axios.get(API + API_POSTS, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      setPosts(response.data);
      return "completed";
    } catch (error) {
      console.log(error.response.data);
      if ((error.response.data.error = "Invalid token")) {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    const response = await getPosts();
    setRefreshing(false);
  }

  function addPost() {
    navigation.navigate("Add");
    console.log(posts.length)
  }

  async function deletePost(id) {
    try {
      const response = await axios.delete(API + API_POSTS + `/${id}`, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response);
      setPosts(posts.filter((item) => item.id !== id));
      setShowAlert(false);
    } catch (error) {
      console.log(error);
    }
  }

  function showAlertHandler(id) {
    idRef.current = id;
    setShowAlert(true);
  }

  function hideAlertHandler() {
    setShowAlert(false);
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { id: item.id })}
      >
      {isList ? 
      
      
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          
          <Text style={[styles.label, styles.text]}>{item.title}</Text>
          <TouchableOpacity
            onPress={() => showAlertHandler(item.id)}
            style={{ paddingTop: 15 }}
          >
            <Feather name="x-circle" size={25} color="red" />
          </TouchableOpacity>
        </View>
      
      
      : <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5,
            flexDirection: "column",
            margin: 1,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 180, height: 250 }}
          />
          <Text style={[styles.label, styles.text]}>{item.title}</Text>
          <TouchableOpacity
            onPress={() => showAlertHandler(item.id)}
            style={{ paddingTop: 15 }}
          >
            <Feather name="x-circle" size={25} color="red" />
          </TouchableOpacity>
        </View> }
        
      </TouchableOpacity>
    );
  }

  return (
    
    <View style={styles.container}>
    { posts.length === 0 && <Text onPress={addPost} style={styles.label}>No comics! Add some now!</Text>}
     {isList?  
      <FlatList
        data={posts}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          //onRefresh={onRefresh}
          colors={["black"]}
      />
        }
        /> :

     
     <FlatList
        data={posts}
        key={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            //onRefresh={onRefresh}
            colors={["black"]}
          />
        }
      /> }
      {showAlert && (
        <View style={[styles.greybox]}>
          <Text style={styles.dialog}>Confirm Delete?</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.dialogbutton]}
              onPress={() => deletePost(idRef.current)}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dialogcancelbutton]}
              onPress={hideAlertHandler}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
