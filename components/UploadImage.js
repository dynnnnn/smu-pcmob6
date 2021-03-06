import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from "react-redux";
import { addPic } from '../redux/ducks/upload';
import { useSelector } from 'react-redux';




export default function UploadImage() {
    const dispatch = useDispatch();
 

    useEffect(() => {
        checkForCameraRollPermission()
      }, []);

 const [image, setImage] = useState(null);

 const addImage = async()=>{
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [3,4],
     quality: 1,
    });
    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      setImage(_image.uri);
      dispatch({...addPic(), payload: _image.uri})
    }

   
 };

 const  checkForCameraRollPermission=async()=>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    }else{
      console.log('Media Permissions are granted')
    }

}

 return (
<View style={imageUploaderStyles.container}>
               {
                   image  &&<Image source={{ uri: image }} style={{ width: 200, height: 300 }} />
               }

<View style={imageUploaderStyles.uploadBtnContainer}>
<TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
<Text>{image ? 'Edit' : 'Upload'} Cover Image</Text>
<AntDesign name="camera" size={20} color="black" />
</TouchableOpacity>
</View>


</View>

 );
}

const imageUploaderStyles=StyleSheet.create({
   container:{
       elevation:2,
       height:250,
       width:160,
       backgroundColor:'#efefef',
       position:'relative',
       borderRadius:0,
       overflow:'hidden',
       alignSelf: 'center',
       margin: 3
   },
   uploadBtnContainer:{
       opacity:0.7,
       position:'absolute',
       right:0,
       bottom:0,
       backgroundColor:'lightgrey',
       width:'100%',
       height:'20%',
   },
   uploadBtn:{
       display:'flex',
       alignItems:"center",
       justifyContent:'center'
   }
})