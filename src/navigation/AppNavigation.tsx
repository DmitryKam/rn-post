import React from "react";
import {NavigationContainer} from '@react-navigation/native'

import {AppStackScreens} from "./StackScreen";


export const AppNavigation: React.FC = (props): React.ReactElement => {

    return (
        <NavigationContainer>
            <AppStackScreens/>
        </NavigationContainer>
    )
}

