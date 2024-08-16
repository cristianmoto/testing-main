import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'react-native'

import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignUpScreen'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" translucent={true} backgroundColor="transparent" />
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false, headerTransparent: true }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='SignUp' component={SignupScreen} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  )
}

export default StackNavigation
