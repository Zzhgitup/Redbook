import React, {FC, useRef} from 'react';
import {View, StyleSheet, Image, Text, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Shop from '../../components/Shop/Shop';
import MainTab from '../../components/mainTab';
import Message from '../../components/Message';
import Mine from '../../components/Mine';

import {icon_tab_publish} from '../../asset/date/image';
const BottomTab = createBottomTabNavigator();
interface Props {
  name?: string;
}
const Home: FC<Props> = () => {
  const selectImg = (res: ImagePickerResponse) => {
    const {assets} = res;
    if (!assets?.length) {
      return;
    }
    const {fileName, fileSize, width, height, uri} = assets[0];
    console.log(fileName, fileName, width, height, uri);
  };
  const Barstyle = ({state, descriptors, navigation}: BottomTabBarProps) => {
    const {routes, index} = state;
    return (
      <View style={styles.Tabberimg}>
        {routes.map((item, i: number) => {
          const {options} = descriptors[item.key];
          const isfouced: boolean = i === index;
          if (i === 2) {
            return (
              <TouchableOpacity
                key={routes[i].name}
                style={styles.publish}
                onPress={() => {
                  //TODU
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      quality: 1,
                      includeBase64: true,
                    },
                    selectImg,
                  );
                }}>
                <Image style={styles.publish} source={icon_tab_publish} />
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              style={styles.item}
              key={i}
              onPress={() => {
                navigation.navigate(routes[i].name);
              }}>
              <Text
                style={{
                  fontSize: isfouced ? 18 : 16,
                  fontWeight: isfouced ? 'bold' : 'normal',
                  width: 40,
                }}>
                {options.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <BottomTab.Navigator
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBar={props => <Barstyle {...props} />}>
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{title: '商城'}}
        />
        <BottomTab.Screen
          name="Main"
          component={MainTab}
          options={{title: '发现'}}
        />
        <BottomTab.Screen
          name="publish"
          component={MainTab}
          options={{title: 'publish'}}
        />
        <BottomTab.Screen
          name="message"
          component={Message}
          options={{title: '消息'}}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{title: '我'}}
        />
      </BottomTab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  Tabberimg: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});
export default Home;
