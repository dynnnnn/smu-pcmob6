import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogStack from '../components/BlogStack';
import AccountStack from '../components/AccountStack';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export default function LoggedInStack() {
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'My Comics') {
            iconName = "bookmark"
          } else if (route.name === 'Settings') {
            iconName = "cog"
          }
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        }, 
    //     tabBarStyle:{
    //   backgroundColor:'#0000ff',
    //   height:100,
    // },
      })}
      // tabBarLabel={() => null}
      
      tabBarOptions={{
        activeTintColor: '#18dbd8',
        inactiveTintColor: 'black',
        tabStyle: {
          backgroundColor: isDark ? "#324a52" : "white",
        },
        
        // headerShown: false
      }} >
        <Tab.Screen name="My Comics" options={{ headerShown: false }} component={BlogStack} />
        <Tab.Screen name="Settings" options={{ headerShown: false }} component={AccountStack} />
      </Tab.Navigator>
  )
} 