import React, {FC} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  name?: string;
}
const Pageb: FC<Props> = () => {
  const useNation = useNavigation<StackNavigationProp<any>>();
  const goback = () => {
    //useNation.replace('PageA');
    useNation.goBack();
    //useNation.pop();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>页面B</Text>
      <Button title="Go Back!" onPress={goback} />
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
export default Pageb;
