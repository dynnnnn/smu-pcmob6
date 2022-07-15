import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_CREATE } from "../constants/API";
import UploadImage from '../components/UploadImage';
import { useSelector } from "react-redux";


export default function CreateScreen({ navigation }) {


  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const image = useSelector((state) => state.addpic.image);
 
  
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [latestIssue, setLatestIssue] = useState("");
  const [nextIssue, setNextIssue] = useState("");
  
  

async function savePost() {
    const post = {
      title: title,
      content: content,
      latestIssue : latestIssue,
      nextIssue: nextIssue,
      image: image
    };
    
    try {
      console.log(token);
      const response = await axios.post(API + API_CREATE, post, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      navigation.navigate("Index", { post: post });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <ScrollView style={styles.container}>
      
      <View style={{ margin: 20 }}>
      <UploadImage />
      
        <Text style={[additionalStyles.label, styles.text]}>Series Title:</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>
          Description:
        </Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>
          Latest Issue Read:
        </Text>
        <TextInput
          style={additionalStyles.input}
          value={latestIssue}
          onChangeText={(text) => setLatestIssue(text)}
        />
         <Text style={[additionalStyles.label, styles.text]}>
          Next Issue Release Date:
        </Text>
         <TextInput
          style={additionalStyles.input}
          value={nextIssue}
          onChangeText={(text) => setNextIssue(text)}
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20, alignSelf:'center' }]}
          onPress={savePost}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 20,
    backgroundColor: '#ededed',
    marginBottom: 15,
    height: 40,
    width: 350,
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'center'
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});