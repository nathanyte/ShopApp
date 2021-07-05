import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer, createSwitchNavigator }  from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { HomeScreen } from './src/screens/HomeScreen'
import { LandingScreen } from './src/screens/LandingScreen'

const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator({
      Langind: LandingScreen,

    },{
      defaultNavigationOptions: {
        headerShown: false,
      }
    })
  },

  homeStack: createBottomTabNavigator({

    home: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true 
          ? <MaterialCommunityIcons name={'home'} size={24} color={'black'}/>
          : <MaterialCommunityIcons name={'home-outline'} size={24} color={'black'}/>
          return icon
        }
      }
    },

    offer: {
      screen: createStackNavigator({
        OfferPage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true 
          ? <AntDesign name={'tags'} size={24} color={'black'}/>
          : <AntDesign name={'tagso'} size={24} color={'black'}/>
          return icon
        }
      }
    },

    cart: {
      screen: createStackNavigator({
        CartPage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true 
          ? <MaterialCommunityIcons name={'cart-plus'} size={24} color={'black'}/>
          : <MaterialCommunityIcons name={'cart-outline'} size={24} color={'black'}/>
          return icon
        }
      }
    },

    account: {
      screen: createStackNavigator({
        AccountPage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true 
          ? <MaterialCommunityIcons name={'account-circle'} size={24} color={'black'}/>
          : <MaterialCommunityIcons name={'account-circle-outline'} size={24} color={'black'}/>
          return icon
        }
      }
    },
  })
  
});

const AppNavigation = createAppContainer(switchNavigator);


export default function App() {
  return (
    <AppNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
