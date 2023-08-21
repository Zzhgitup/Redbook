import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface Props {
  name?: string;
}
const Home: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.tital}>首页</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tital: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default Home;
