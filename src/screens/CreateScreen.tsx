import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { DrawerActions } from '@react-navigation/native'

import { useDispatch } from 'react-redux'
import { AppHeaderIcon } from '~/components/AppHeaderIcon'
import { THEME } from '~/theme'
import { PhotoPicker } from '~/components/PhotoPicker'
import { MainNavigationPropsType, MainRoutes } from '~/navigation/types'
import { PostDataType } from '~/data'
import { createPost } from '~/store/actions/postThunks'

type CreateScreenPropsType = {
  navigation: MainNavigationPropsType<MainRoutes.Create>
}

const styles = StyleSheet.create({
  stylesWrapper: {
    padding: 10
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

export const CreateScreen: React.FC<CreateScreenPropsType> = props => {
  const { navigation } = props
  const [text, setText] = useState<string>('')
  const [image, setImage] = useState<string | null>(null)
  const dispatch = useDispatch()
  const imageRef = useRef<string>()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create Post',
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

  const saveHandler = () => {
    if (imageRef.current) {
      const post = ({
        date: new Date().toJSON(),
        text,
        img: imageRef.current,
        booked: false
      } as unknown) as PostDataType
      dispatch(createPost(post))
      navigation.navigate(MainRoutes.Main)
      setImage(null)
    }
    setText('')
  }
  const photoPickHandler = (uri: string) => {
    imageRef.current = uri
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View style={styles.stylesWrapper}>
          <Text style={styles.title}>Create new post</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter post text"
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker
            onPick={photoPickHandler}
            image={image}
            setImage={setImage}
          />
          <Button
            title="Create Post"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text && !imageRef.current}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
