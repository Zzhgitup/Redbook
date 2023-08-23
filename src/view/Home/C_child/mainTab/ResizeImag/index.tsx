import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
interface Props {
  name?: string;
  uri: string;
}
const {width: Sreenwidth} = Dimensions.get('screen');
const ResizeImg: FC<Props> = ({uri}) => {
  const [viewheight, setheight] = useState(0);
  useEffect(() => {
    Image.getSize(uri, (width: number, height: number) => {
      const showheight = (((Sreenwidth - 16) / 2) * height) / width;
      setheight(showheight);
    });
  }, []);
  return (
    <Image
      source={{uri: uri}}
      style={{
        width: (Sreenwidth - 16) / 2,
        height: viewheight,
        resizeMode: 'cover',
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
export default ResizeImg;
