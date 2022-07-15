import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from '../screens/IndexScreen';
import CreateScreen from '../screens/CreateScreen';
import EditScreen from '../screens/EditScreen';
import ShowScreen from '../screens/DetailsScreen';
import { darkStyles, lightStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";



const InnerStack = createStackNavigator();



export default function BlogStack({ navigation }) {

  
  
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.addpic.username);

  const styles = isDark ? darkStyles : lightStyles;
    const headerOptions = {
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerTintColor: styles.headerTint
    }



    // async function getUsername() {
    //   console.log("---- Getting user name ----");
  
    //   console.log(`Token is ${token}`);
    //   try {
    //     const response = await axios.get(API + API_WHOAMI, {
    //       headers: { Authorization: `JWT ${token}` },
    //     });
    //     console.log("Got user name!");
    //     setUsername(response.data.username);
    //   } catch (error) {
    //     console.log("Error getting user name");
    //     if (error.response) {
    //       console.log(error.response.data);
    //       if (error.response.data.status_code === 401) {
    //         signOut();
    //         navigation.navigate("SignInSignUp");
    //       }
    //     } else {
    //       console.log(error);
    //     }
    //     // We should probably go back to the login screen???
    //   }
    // }

    // useEffect(() => {
      
    //   // Check for when we come back to this screen
    //   const removeListener = navigation.addListener("focus", () => {
    
    //     setUsername(<ActivityIndicator />)
    //     getUsername();

    //   });
    //   getUsername();
    //   return removeListener;
    // }, []);
  
   
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name="Index" component={IndexScreen} options={{ title: "My Comics", ...headerOptions, headerLeft: null }} />
      <InnerStack.Screen name="Add" component={CreateScreen} options={{ title: "Add Comic", ...headerOptions }} />
      <InnerStack.Screen name="Details" component={ShowScreen} options={headerOptions} />
      <InnerStack.Screen name="Edit" component={EditScreen} options={{ title: "Edit Comic", ...headerOptions }} />
    </InnerStack.Navigator>
  )
}