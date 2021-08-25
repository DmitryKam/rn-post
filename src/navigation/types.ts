import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export enum MainRoutes {
  Main = 'Main',
  Post = 'Post',
  Booked = 'Booked',
  Create = 'Create',
  About = 'About',
  PostStackScreen = 'PostStackScreen',
  BookedStackScreen = 'BookedStackScreen',
  BottomStackScreens = 'BottomStackScreens',
  AboutStackScreens = 'AboutStackScreens',
  CreateStackScreens = 'CreateStackScreens'
}

export type MainStackParamList = {
  [MainRoutes.Main]: undefined
  [MainRoutes.Post]: {
    postId: string
    date: Record<string, any>
    booked: boolean
  }
  [MainRoutes.Booked]: undefined
  [MainRoutes.Create]: undefined
  [MainRoutes.About]: undefined
  [MainRoutes.PostStackScreen]: undefined
  [MainRoutes.BookedStackScreen]: undefined
  [MainRoutes.BottomStackScreens]: undefined
  [MainRoutes.AboutStackScreens]: undefined
  [MainRoutes.CreateStackScreens]: undefined
}
export type ScreensRouteProp<A extends MainRoutes> = RouteProp<
  MainStackParamList,
  A
>
export type MainNavigationPropsType<
  RouteName extends keyof MainStackParamList = MainRoutes
> = StackNavigationProp<MainStackParamList, RouteName>
