import React, {FC, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ArticelDetilStore from './ArticelDetailStore';
import {useLocalStore} from 'mobx-react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {icon_arrow, icon_share} from '../../asset/date/image';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  name?: string;
}
type RouteParams = {
  ArticelDetil: {
    id: string;
  };
};
const ArticelDetail: FC<Props> = () => {
  //路由导航
  const route = useNavigation<StackNavigationProp<any>>();
  //mobx
  const ArticelDetil = useLocalStore(() => new ArticelDetilStore());
  //传入文章参数
  const {params} = useRoute<RouteProp<RouteParams, 'ArticelDetil'>>();
  useEffect(() => {
    ArticelDetil.requsetArticelDetil(params.id);
  }, []);
  const goback = () => {
    route.goBack();
  };
  const Header = () => {
    const styles = StyleSheet.create({
      Header: {
        width: '100%',
        paddingHorizontal: 6,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      Headerleftimg: {
        height: 43,
        width: 40,
        transform: [{scale: 0.5}],
      },
      Headeravater: {
        height: 43,
        width: 43,
        resizeMode: 'contain',
        borderRadius: 21.5,
        transform: [{scale: 0.8}],
      },
      Headerleft: {
        flexDirection: 'row',
        width: '50%',
        height: 43,
        alignItems: 'center',
        overflow: 'hidden',
      },
      Headername: {
        color: 'black',
        marginLeft: 5,
        flexWrap: 'nowrap',
      },
      point: {
        marginRight: 10,
        marginVertical: 8,
        paddingHorizontal: 15,
        fontSize: 12,
        paddingVertical: 5,
        borderWidth: 1,
        color: 'rgb(255,36,66)',
        borderColor: 'rgb(255,36,66)',
        borderRadius: 20,
      },
      Headerrigth: {
        width: '50%',
        height: 43,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
    });
    return (
      <View style={styles.Header}>
        <View style={styles.Headerleft}>
          <TouchableOpacity onPress={goback}>
            <Image style={styles.Headerleftimg} source={icon_arrow} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.Headeravater}
              source={{
                uri: 'https://img2.baidu.com/it/u=3882285499,3638229272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              }}
            />
          </TouchableOpacity>
          <Text
            style={styles.Headername}
            numberOfLines={1}
            ellipsizeMode="clip">
            你好瘦瘦你好瘦瘦你好瘦瘦你好瘦瘦
          </Text>
        </View>
        <View style={styles.Headerrigth}>
          <TouchableOpacity>
            <Text style={styles.point}>关注</Text>
          </TouchableOpacity>
          <Image
            style={[styles.Headerleftimg, {transform: [{scale: 0.7}]}]}
            source={icon_share}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
export default ArticelDetail;
