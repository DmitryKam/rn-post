import React from "react";
import {MainScreen} from "../screens/MainScreen";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {Platform} from "react-native";
import {THEME} from "../theme";
import {PostScreen} from "../screens/PostScreen";
import {BookedScreen} from "../screens/BookedScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {CreateScreen} from "../screens/CreateScreen";
import {AboutScreen} from "../screens/AboutScreen";
import {Ionicons} from "@expo/vector-icons";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";


const PostStack = createStackNavigator<MainStackParamList>()
const DrawerStack = createDrawerNavigator()
const BottomTabStack = createMaterialBottomTabNavigator()
const AboutStack = createStackNavigator()
const CreateStack = createStackNavigator()

export enum MainRoutes {
    Main = 'Main',
    Post = 'Post',
    Booked = 'Booked',
    Create = 'Create',
    About = 'About',
    PostStackScreen = 'PostStackScreen',
    BookedStackScreen = 'BookedStackScreen',
    BottomStackScreens = 'BottomStackScreens',
    AboutStackScreens = 'AboutStackScreens',
    CreateStackScreens = 'CreateStackScreens'


}

export type MainStackParamList = {
    [MainRoutes.Main]: undefined
    [MainRoutes.Post]: { postId: string, date: Object, booked: boolean }
    [MainRoutes.Booked]: undefined
    [MainRoutes.Create]: undefined
    [MainRoutes.About]: undefined
    [MainRoutes.PostStackScreen]: undefined
    [MainRoutes.BookedStackScreen]: undefined
    [MainRoutes.BottomStackScreens]: undefined
    [MainRoutes.AboutStackScreens]: undefined
    [MainRoutes.CreateStackScreens]: undefined
}

export type ScreensRouteProp<A extends MainRoutes> = RouteProp<MainStackParamList, A>
export type MainNavigationPropsType<RouteName extends keyof MainStackParamList = MainRoutes> = StackNavigationProp<MainStackParamList, RouteName>

const screenOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'
}


export const PostStackScreen = () => {

    return (
        <PostStack.Navigator initialRouteName={MainRoutes.Main} screenOptions={screenOptions}>
            <PostStack.Screen name={MainRoutes.Main} component={MainScreen}/>
            <PostStack.Screen name={MainRoutes.Post} component={PostScreen}/>
        </PostStack.Navigator>
    )
}

export const BookedStackScreen = () => {

    return (
        <PostStack.Navigator screenOptions={screenOptions}>
            <PostStack.Screen name={MainRoutes.Booked} component={BookedScreen}/>
            <PostStack.Screen name={MainRoutes.Post} component={PostScreen}/>
        </PostStack.Navigator>
    )
}

export const BottomStackScreens = () => {

    const bottomScreenOptions = Platform.OS === "ios"
        ? {
            barStyle: {backgroundColor: '#fff'},
            activeColor: THEME.MAIN_COLOR,
            shifting: true
        }
        : {
            barStyle: {backgroundColor: THEME.MAIN_COLOR},
            activeColor: '#fff',
            shifting: true
        }
    return (
        <BottomTabStack.Navigator {...bottomScreenOptions}>
            <BottomTabStack.Screen name={MainRoutes.PostStackScreen} component={PostStackScreen} options={{
                tabBarLabel: 'All',
                tabBarIcon: (info) => (<Ionicons name='ios-albums' size={25} color={info.color}/>)
            }}/>
            <BottomTabStack.Screen name={MainRoutes.BookedStackScreen} component={BookedStackScreen} options={{
                tabBarLabel: 'Favorites',
                tabBarIcon: (info) => (<Ionicons name='ios-star' size={25} color={info.color}/>)
            }}/>
        </BottomTabStack.Navigator>
    )
}

export const AboutStackScreens = () => {

    return (
        <AboutStack.Navigator {...screenOptions}>
            <AboutStack.Screen name={MainRoutes.About} component={AboutScreen}/>
        </AboutStack.Navigator>
    )
}

export const CreateStackScreens = () => {

    return (
        <CreateStack.Navigator {...screenOptions}>
            <CreateStack.Screen name={MainRoutes.Create} component={CreateScreen}/>
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
            }}>
            <DrawerStack.Screen
                name={MainRoutes.BottomStackScreens}
                options={{
                    drawerLabel: 'General'
                }}
                component={BottomStackScreens}/>
            <DrawerStack.Screen
                name={MainRoutes.AboutStackScreens}
                options={{
                    drawerLabel: 'About App'
                }}
                component={AboutStackScreens}/>
            <DrawerStack.Screen
                name={MainRoutes.CreateStackScreens}
                options={{
                    drawerLabel: 'New Post'
                }}
                component={CreateStackScreens}/>
        </DrawerStack.Navigator>
    )
}
