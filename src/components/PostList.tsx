import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {PostDataType} from "../data";
import {Post} from "./Post";


type PostListPropsType = {
    data: PostDataType[],
    onOpen: (post: PostDataType) => void
}

export const PostList: React.FC<PostListPropsType> = (props) => {
    const {data, onOpen} = props

    if (!data.length) {
        return <View style={styles.wrapper}><Text style={styles.noItems}>There are no posts</Text></View>
    }

    const renderItem = ({item}: { item: PostDataType }) => {

        return <Post post={item} onOpen={onOpen}/>
    }

    return (
        <View style={styles.wrapper}>
            <FlatList data={data} renderItem={renderItem} keyExtractor={post => post.id.toString()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems: {
        fontSize: 18,
        fontFamily: 'open-regular',
        textAlign: "center",
        marginVertical: 10
    }
})