import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, Platform, StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

type PhotoPickerPropsType = {
  onPick: (uri: string) => void
  image: string | null
  setImage: (img: string | null) => void
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
})

export const PhotoPicker: React.FC<PhotoPickerPropsType> = props => {
  const { onPick, image, setImage } = props

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work!'
          )
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7
    })

    if (!result.cancelled) {
      setImage(result.uri)
      onPick(result.uri)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Button title="Take Photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  )
}
