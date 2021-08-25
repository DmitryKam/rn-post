import React, { useState } from 'react'
import AppLoading from 'expo-app-loading'
import { Provider } from 'react-redux'
import { bootstrap } from '~/bootstrap'
import { AppNavigation } from '~/navigation/AppNavigation'
import store from './src/store'

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}
