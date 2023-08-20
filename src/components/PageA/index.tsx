import React, {FC} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  name?: string;
}

const PageA: FC<Props> = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const pushB = () => {
    navigation.push('PageB');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>页面A</Text>
      <Button title="Go page A!" onPress={pushB} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  textstyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default PageA;
