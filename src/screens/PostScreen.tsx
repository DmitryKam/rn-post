import React, {useCallback, useEffect} from "react";
import {Alert, Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";

import {PostDataType} from "../data";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {MainNavigationPropsType, MainRoutes, ScreensRouteProp} from "../navigation/StackScreen";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store";
import {deletePost, removePost, toggleBooked, updateBooked} from "../store/actions/postActions";

type MainScreenPropsType = {
    navigation: MainNavigationPropsType<MainRoutes.Post>
    route: ScreensRouteProp<MainRoutes.Post>
}

export const PostScreen: React.FC<MainScreenPropsType> = (props) => {
    const {navigation, route} = props
    const dispatch = useDispatch()
    const allPost = useSelector<AppStateType, Array<PostDataType>>(state => state.post.allPosts)
    const {postId, date} = route.params
    const post = allPost.find(post => post.id === postId) as PostDataType
    console.log('post', post)
    const changeHandler = useCallback((post: PostDataType) => {
        dispatch(updateBooked(post))
    }, [dispatch])

    useEffect(() => {
        console.log('Effect')

        if (post) {
            navigation.setOptions({
                headerTitle: `Post ${postId} from ${new Date(date.toString()).toLocaleDateString()}`,
                headerRight: (props) => {
                    const iconName = post.booked ? 'ios-star' : 'ios-star-outline'
                    return (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item title={'Take photo'} iconName={iconName} onPress={() => {
                                changeHandler(post)
                            }}/>
                        </HeaderButtons>
                    )
                },
            })
        } else {
            navigation.navigate(MainRoutes.Main)
        }
    }, [navigation, changeHandler, post?.booked])


    const removeHandler = () => {
        Alert.alert(
            "Delete Post",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", style: 'destructive', onPress: () => {
                        dispatch(deletePost(postId))
                    }
                }
            ],
            {cancelable: false}
        );

    }

    return post ? (
        <ScrollView>
            <Image source={{uri: post.img}} style={styles.image}/>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button title={'Delete'} color={THEME.DANDER_COLOR} onPress={removeHandler}/>
        </ScrollView>
    ) : null
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }
})