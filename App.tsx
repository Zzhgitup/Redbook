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
import PageA from './src/components/PageA';
import Pageb from './src/components/PageB';
const Stack = createStackNavigator();
function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'default'} backgroundColor={'white'} />
      <NavigationContainer>
        {/* 路由栈 */}
        <Stack.Navigator initialRouteName="PageA">
          <Stack.Screen
            name="PageA"
            component={PageA}
            options={{
              headerShown: true,
              ...TransitionPresets.FadeFromBottomAndroid,
            }}
          />
          <Stack.Screen
            name="PageB"
            component={Pageb}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
