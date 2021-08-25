import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MainScreen } from '~/screens/MainScreen'
import { THEME } from '~/theme'
import { PostScreen } from '~/screens/PostScreen'
import { BookedScreen } from '~/screens/BookedScreen'
import { CreateScreen } from '~/screens/CreateScreen'
import { AboutScreen } from '~/screens/AboutScreen'
import { MainRoutes, MainStackParamList } from '~/navigation/types'

const PostStack = createStackNavigator<MainStackParamList>()
const DrawerStack = createDrawerNavigator()
const BottomTabStack = createMaterialBottomTabNavigator()
const AboutStack = createStackNavigator()
const CreateStack = createStackNavigator()

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
  },
  headerTintColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'
}

export const PostStackScreen = () => {
  return (
    <PostStack.Navigator
      initialRouteName={MainRoutes.Main}
      screenOptions={screenOptions}
    >
      <PostStack.Screen name={MainRoutes.Main} component={MainScreen} />
      <PostStack.Screen name={MainRoutes.Post} component={PostScreen} />
    </PostStack.Navigator>
  )
}

export const BookedStackScreen = () => {
  return (
    <PostStack.Navigator screenOptions={screenOptions}>
      <PostStack.Screen name={MainRoutes.Booked} component={BookedScreen} />
      <PostStack.Screen name={MainRoutes.Post} component={PostScreen} />
    </PostStack.Navigator>
  )
}

export const BottomStackScreens = () => {
  const bottomScreenOptions =
    Platform.OS === 'ios'
      ? {
          barStyle: { backgroundColor: '#fff' },
          activeColor: THEME.MAIN_COLOR,
          shifting: true
        }
      : {
          barStyle: { backgroundColor: THEME.MAIN_COLOR },
          activeColor: '#fff',
          shifting: true
        }
  return (
    <BottomTabStack.Navigator {...bottomScreenOptions}>
      <BottomTabStack.Screen
        name={MainRoutes.PostStackScreen}
        component={PostStackScreen}
        options={{
          tabBarLabel: 'All',
          tabBarIcon: info => {
            const { color } = info

            return <Ionicons name="ios-albums" size={25} color={color} />
          }
        }}
      />
      <BottomTabStack.Screen
        name={MainRoutes.BookedStackScreen}
        component={BookedStackScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: info => (
            <Ionicons name="ios-star" size={25} color={info.color} />
          )
        }}
      />
    </BottomTabStack.Navigator>
  )
}

export const AboutStackScreens = () => {
  return (
    <AboutStack.Navigator {...screenOptions}>
      <AboutStack.Screen name={MainRoutes.About} component={AboutScreen} />
    </AboutStack.Navigator>
  )
}

export const CreateStackScreens = () => {
  return (
    <CreateStack.Navigator {...screenOptions}>
      <CreateStack.Screen name={MainRoutes.Create} component={CreateScreen} />
    </CreateStack.Navigator>
  )
}

export const AppStackScreens = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerActiveTintColor: THEME.MAIN_COLOR,
        drawerLabelStyle: {
          fontFamily: 'open-bold'
        }
      }}
    >
      <DrawerStack.Screen
        name={MainRoutes.BottomStackScreens}
        options={{
          drawerLabel: 'General'
        }}
        component={BottomStackScreens}
      />
      <DrawerStack.Screen
        name={MainRoutes.AboutStackScreens}
        options={{
          drawerLabel: 'About App'
        }}
        component={AboutStackScreens}
      />
      <DrawerStack.Screen
        name={MainRoutes.CreateStackScreens}
        options={{
          drawerLabel: 'New Post'
        }}
        component={CreateStackScreens}
      />
    </DrawerStack.Navigator>
  )
}
