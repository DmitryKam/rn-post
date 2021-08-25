import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { THEME } from '~/theme'

type AppHeaderPropsType = {}

export const AppHeaderIcon: React.FC<AppHeaderPropsType> = props => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      title="s"
      iconSize={24}
      color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
      {...props}
    />
  )
}
