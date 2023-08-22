import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface Props {
  name?: string;
}
const Mine: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
export default Mine;
