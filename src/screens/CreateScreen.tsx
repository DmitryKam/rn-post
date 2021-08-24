import React, {useEffect, useRef, useState} from "react";
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
import {addPost, createPost} from "../store/actions/postActions";
import {PhotoPicker} from "../components/PhotoPicker";

type CreateScreenPropsType = {
    navigation: MainNavigationPropsType<MainRoutes.Create>
}

export const CreateScreen: React.FC<CreateScreenPropsType> = (props) => {
    const {navigation} = props
    const [text, setText] = useState<string>('')
    const dispatch = useDispatch()
    const imageRef = useRef<string>()

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
        if (imageRef.current) {
            const post = {
                id: 'any',
                date: new Date().toJSON(),
                text: text,
                img: imageRef.current,
                booked: false
            }
            dispatch(createPost(post))
            navigation.navigate(MainRoutes.Main)
        }
    }
    const photoPickHandler = (uri: string) => {
        imageRef.current = uri
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
                    <PhotoPicker onPick={photoPickHandler}/>
                    <Button title={'Create Post'} color={THEME.MAIN_COLOR} onPress={saveHandler}
                            disabled={!text && !imageRef.current}/>
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