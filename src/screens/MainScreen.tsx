import React, {useEffect} from "react";
import {DATA, PostDataType} from "../data";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {MainNavigationPropsType, MainRoutes} from "../navigation/StackScreen";
import {PostList} from "../components/PostList";
import {DrawerActions} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostData, loadPosts} from "../store/actions/postActions";
import {AppStateType} from "../store";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {THEME} from "../theme";


type MainScreenPropsType = {
    navigation: MainNavigationPropsType<MainRoutes.Main>
}

export const MainScreen: React.FC<MainScreenPropsType> = (props) => {
    const {navigation} = props
    const dispatch = useDispatch()
    const allPosts = useSelector<AppStateType, Array<PostDataType>>(state => state.post.allPosts)
    const loading = useSelector<AppStateType, boolean>(state => state.post.loading)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'My Blog',
            headerRight: (props) => {
                return (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item title={'Take photo'} iconName={'ios-camera'} onPress={() => {
                            navigation.navigate(MainRoutes.CreateStackScreens)
                        }}/>
                    </HeaderButtons>
                )
            },
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


    useEffect(() => {
        dispatch(fetchPostData())
    }, [dispatch])

    const openPostHandler = (post: PostDataType) => {
        navigation.navigate(MainRoutes.Post, {
            postId: post.id, date: post.date, booked: post.booked
        })
    }

    if (loading) {
        return <View style={styles.center}>
            <ActivityIndicator color={THEME.MAIN_COLOR}/>
        </View>
    }

    return (
        <PostList data={allPosts} onOpen={openPostHandler}/>
    )
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})