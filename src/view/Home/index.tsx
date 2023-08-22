import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Shop from '../../components/Shop/Shop';
import MainTab from '../../components/mainTab';
import Message from '../../components/Message';
import Mine from '../../components/Mine';
const BottomTab = createBottomTabNavigator();
interface Props {
  name?: string;
}
const Home: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Shop" component={Shop} />
        <BottomTab.Screen name="Main" component={MainTab} />
        <BottomTab.Screen name="message" component={Message} />
        <BottomTab.Screen name="Mine" component={Mine} />
      </BottomTab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  tital: {},
});
export default Home;
