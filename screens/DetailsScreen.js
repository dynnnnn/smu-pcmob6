import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Button, Share } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';


export default function ShowScreen({ navigation, route }) {
  const [post, setPost] = useState({
    title: "",
    content: "",
    latestIssue: "",
    nextIssue: "",
  });

  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const image = useSelector((state) => state.addpic.image);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  const options = {
    message: "The next issue of "+ post.title +" is coming out on " + post.nextIssue + "!"
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={editPost} style={{ marginRight: 10 }}>
          <MaterialCommunityIcons
            name="pencil-circle"
            size={36}
            color={styles.headerTint}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} style={{ marginRight: 10 }}>
          <MaterialCommunityIcons
            name="share-circle"
            size={36}
            color={styles.headerTint}
          />
        </TouchableOpacity>
        </View>
      ),
    });
  });

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const id = route.params.id;
    console.log(id);
    try {
      const response = await axios.get(API + API_POSTS + "/" + id, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      console.log(error.response.data);
      if ((error.response.data.error = "Invalid token")) {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  function editPost() {
    navigation.navigate("Edit", { post: post });
  }

  const onShare = async () => {
    try {
      const result = await Share.share(options);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, styles.text]}>{post.title}</Text>

      <Image
        source={{ uri: post.image }}
        style={{ width: 270, height: 350, alignSelf: "center" }}
      />
      <View style={[styles.greybox]}>
        <Text style={[styles.label]}>
          Description:
        </Text>
        <Text style={[styles.content]}>
          {post.content}
        </Text>
      </View>
      <View style={[styles.greybox]}>
      <Text style={[styles.label]}>
        Latest Issue Read:
      </Text>
      <Text style={[styles.content]}>
        {post.latestIssue}
      </Text>
      </View>
      <View style={[styles.greybox]}>
      <Text style={[styles.label]}>
        Next Issue Release:
      </Text>
      <Text style={[styles.content]}>
        {post.nextIssue}
      </Text>
      </View>
      
    </ScrollView>
  );
}
