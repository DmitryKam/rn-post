import React, {useEffect, useState} from "react";
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {DrawerActions} from "@react-navigation/native";

import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {MainNavigationPropsType, MainRoutes} from "../navigation/StackScreen";
import {THEME} from "../theme";
import {useDispatch} from "react-redux";
import {addPost} from "../store/actions/postActions";

type CreateScreenPropsType = {
    navigation: MainNavigationPropsType<MainRoutes.Create>
}

export const CreateScreen: React.FC<CreateScreenPropsType> = (props) => {
    const {navigation} = props
    const [text, setText] = useState<string>('')
    const dispatch = useDispatch()


    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Create Post',
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


    const saveHandler = () => {
        dispatch(addPost(text, 'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg'))
        navigation.navigate(MainRoutes.Main)
    }
    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss
            }}>
                <View style={styles.stylesWrapper}>
                    <Text style={styles.title}>Create new post</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder={'Enter post text'}
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <Image style={{width: '100%', height: 300, marginBottom: 10}}
                           source={{uri: 'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg'}}/>
                    <Button title={'Create Post'} color={THEME.MAIN_COLOR} onPress={saveHandler}/>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    stylesWrapper: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    textArea: {
        padding: 10,
        marginBottom: 10
    }
})