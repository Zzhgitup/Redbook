/* eslint-disable react/self-closing-comp */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
/* import {StyleSheet, View} from 'react-native'; */
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native'; //导航栈
import {StatusBar} from 'react-native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import Welcome from './src/view/Welcome';
import Login from './src/view/login';
const Stack = createStackNavigator();
function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'default'} backgroundColor={'white'} />
      <NavigationContainer>
        {/* 路由栈 */}
        <Stack.Navigator initialRouteName="welcome">
          <Stack.Screen
            name="welcome"
            component={Welcome}
            options={{
              headerShown: false,
              ...TransitionPresets.FadeFromBottomAndroid,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              ...TransitionPresets.ScaleFromCenterAndroid,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
