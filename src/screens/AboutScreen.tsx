import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {DrawerActions} from "@react-navigation/native";
import {MainNavigationPropsType, MainRoutes} from "../navigation/StackScreen";

type AboutScreenPropsType = {
    navigation: MainNavigationPropsType<MainRoutes.About>
}

export const AboutScreen: React.FC<AboutScreenPropsType> = (props) => {
    const {navigation} = props

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'About Application',
            headerLeft: (props) => {

                return (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item title={'Toggle Drawer'} iconName={'ios-menu'} onPress={() => {
                            navigation.dispatch(DrawerActions.toggleDrawer())
                        }}/>
                    </HeaderButtons>
                )
            }
        })
    }, [navigation])

    return (
        <View style={styles.center}>
            <Text>There is the best App about Todo</Text>
            <Text style={{marginTop:10}}>Version: <Text style={styles.version}>1.0.0</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    version: {
        fontFamily: 'open-bold'
    }
})