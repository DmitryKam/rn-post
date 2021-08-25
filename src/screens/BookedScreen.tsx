import React, { useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { DrawerActions } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { PostDataType } from '~/data'
import { AppHeaderIcon } from '~/components/AppHeaderIcon'
import { PostList } from '~/components/PostList'
import { AppStateType } from '~/store'
import { MainNavigationPropsType, MainRoutes } from '~/navigation/types'

type MainScreenPropsType = {
  navigation: MainNavigationPropsType<MainRoutes.Booked>
}

export const BookedScreen: React.FC<MainScreenPropsType> = props => {
  const { navigation } = props
  const bookedPost = useSelector<AppStateType, Array<PostDataType>>(
    state => state.post.bookedPosts
  )

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Favorites',
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Toggle Drawer"
              iconName="ios-menu"
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
              }}
            />
          </HeaderButtons>
        )
      }
    })
  }, [navigation])

  const openPostHandler = (post: PostDataType) => {
    navigation.navigate(MainRoutes.Post, {
      postId: post.id,
      date: post.date,
      booked: post.booked
    })
  }

  return <PostList data={bookedPost} onOpen={openPostHandler} />
}
