import React, {useEffect} from "react";
import {PostDataType} from "../data";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {MainNavigationPropsType, MainRoutes} from "../navigation/StackScreen";
import {PostList} from "../components/PostList";
import {DrawerActions} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store";

type MainScreenPropsType = {
    navigation: MainNavigationPropsType<MainRoutes.Booked>
}

export const BookedScreen: React.FC<MainScreenPropsType> = (props) => {
    const {navigation} = props
    const dispatch = useDispatch()
    const bookedPost = useSelector<AppStateType, Array<PostDataType>>(state => state.post.bookedPosts)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Favorites',
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


    const openPostHandler = (post: PostDataType) => {
        navigation.navigate(MainRoutes.Post, {
            postId: post.id, date: post.date, booked: post.booked
        })
    }

    return (
        <PostList data={bookedPost} onOpen={openPostHandler}/>
    )
}