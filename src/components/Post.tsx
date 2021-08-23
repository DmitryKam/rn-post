import React from "react";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {PostDataType} from "../data";


type PostPropsType = {
    post: PostDataType
    onOpen: (post: PostDataType) => void
}

export const Post: React.FC<PostPropsType> = (props) => {
    const {post, onOpen} = props

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
            <View style={styles.post}>
                <ImageBackground style={styles.image} source={{uri: post.img}}>
                    <View style={styles.textWrap}>
                        <Text style={styles.title}>
                            {new Date(post.date.toString()).toLocaleDateString()}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        color: '#fff',
        fontFamily: 'open-regular'
    }
})