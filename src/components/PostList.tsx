import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {DATA, PostDataType} from "../data";
import {Post} from "./Post";


type PostListPropsType = {
    data: PostDataType[],
    onOpen: (post: PostDataType) => void
}

export const PostList: React.FC<PostListPropsType> = (props) => {
    const {data, onOpen} = props

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
    }
})