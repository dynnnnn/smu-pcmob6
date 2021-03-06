import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { API, API_POSTS } from "../constants/API";
import axios from "axios";
import { useSelector } from "react-redux";
import UploadImage from "../components/UploadImage";




export default function EditScreen({ navigation, route }) {

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const image = useSelector((state) => state.addpic.image);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [latestIssue, setLatestIssue] = useState("");
  const [nextIssue, setNextIssue] = useState("");
  
 


  const token = useSelector((state) => state.auth.token);


  useEffect(() => {
    const post = route.params.post
    setTitle(post.title);
    setContent(post.content);
    setLatestIssue(post.latestIssue);
    setNextIssue(post.nextIssue);
    
  }, [])

  async function editPost() {
    const post = {
      "title": title,
      "content": content,
      "latestIssue": latestIssue,
      "nextIssue": nextIssue,
      "image": image
    }
   
    const id = route.params.post.id
    try {
      console.log(token);
      const response = await axios.put(API + API_POSTS + "/" + id, post, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response.data)
      navigation.navigate("Index")
    } catch (error) {
      console.log(error)
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
        <Text style={[additionalStyles.label, styles.text]}>Description:</Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={text => setContent(text)}
        />
         <Text style={[additionalStyles.label, styles.text]}>Latest Issue Read:</Text>
        <TextInput
          style={additionalStyles.input}
          value={latestIssue}
          onChangeText={text => setLatestIssue(text)}
        />
         <Text style={[additionalStyles.label, styles.text]}>Next Issue Date:</Text>
        <TextInput
          style={additionalStyles.input}
          value={nextIssue}
          onChangeText={text => setNextIssue(text)}
        />
      <TouchableOpacity style={[styles.button, {marginTop: 20, alignSelf:'center'}]} onPress={editPost}>
        <Text style={styles.buttonText}>
          Save
        </Text>
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
