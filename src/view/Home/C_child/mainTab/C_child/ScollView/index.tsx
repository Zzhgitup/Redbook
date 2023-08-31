import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {icon_arrow} from '../../../../../../asset/date/image';
interface Props {
  name?: string;
  category: Category[];
  ModalFun: (res: boolean) => void;
}
const Scollview: FC<Props> = ({category, ModalFun}) => {
  const [selectcategory, setCategory] = useState<Category>({
    name: '推荐',
    isAdd: true,
    default: true,
  });
  const [show, setshow] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.ViewScoll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {category.map(item => {
          return (
            <TouchableOpacity
              style={styles.ctrage}
              onPress={() => {
                if (selectcategory.name === item.name) return;
                setCategory({...item});
              }}
              key={item.name + 'cator'}>
              <Text
                style={[
                  selectcategory.name === item.name
                    ? styles.textative
                    : styles.text,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.rightright}
        onPress={() => {
          console.log('打开');
          ModalFun(true);
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            height: 20,
            width: 20,
            transform: [{rotate: '-90deg'}],
          }}
          source={icon_arrow}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 39,
    flexDirection: 'row',
  },
  root: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingBottom: 6,
  },
  ViewScoll: {
    flex: 1,
    height: '100%',
  },
  rightright: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctrage: {
    width: 80,
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 40,
  },
  text: {
    fontSize: 16,
  },
  textative: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default Scollview;
