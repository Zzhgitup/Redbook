import React, {ElementRef, FC, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {observer, useLocalStore} from 'mobx-react';
import HomeStorage from './HomeStore';
import ResizeImg from './ResizeImag';
import FlowList from '../../../../components/flowlist/FlowList.js';
import Headr from './C_child/Head';
import MaintaBar from '../../../../components/MainTaber/index';
import Scollview from './C_child/ScollView';
import CategoryModal from '../../../../components/CategoryModal';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  name?: string;
}
const {width: Sreenwidth} = Dimensions.get('screen');
const MainTab: FC<Props> = observer(() => {
  const nagavtie = useNavigation<StackNavigationProp<any>>();
  //Mobx管理的Homelist数据
  const listhome = useLocalStore(() => new HomeStorage());
  const modal = useRef<ElementRef<typeof CategoryModal>>(null);
  useEffect(() => {
    listhome.requestHomelist();
    listhome.getcategory();
  }, []);
  //下拉刷新
  const refreshing = () => {
    listhome.resetpage();
    listhome.requestHomelist();
  };
  //添加上KEY
  const renderkey = (item: ArticleSimple, index: number): string => {
    return item.userName + Math.random();
  };
  //渲染列表
  const renderitem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          nagavtie.push('article', {id: String(item.id)});
        }}>
        <View style={[styles.homelistitem]}>
          <View style={styles.boximg}>
            <ResizeImg uri={item.image} key={index + item.title} />
          </View>
          <Text style={styles.itemtital}>{item.title}</Text>
          <View style={styles.userinfo}>
            <View style={styles.userinfoleft}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                }}
                source={{uri: item.avatarUrl}}
              />
              <Text style={{fontSize: 12, marginLeft: 5}}>{item.userName}</Text>
            </View>
            <View style={styles.userinforight}>
              <Headr defaultfoucus={item.isFavorite} />
              <Text>{item.favoriteCount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  //加载更多数据
  const loadnewDate = () => {
    listhome.requestHomelist();
  };
  const upmodal = useCallback((res: boolean) => {
    modal.current?.ModalUp();
  }, []);
  return (
    <View style={styles.container}>
      <MaintaBar />
      <FlowList
        style={styles.fastlist}
        data={listhome.Homelist}
        showsVerticalScrollIndicator={false} //滚动条
        renderItem={renderitem}
        numColumns={2}
        keyExtractor={renderkey}
        onEndReachedThreshold={0.1}
        onEndReached={loadnewDate} //触发更新
        refreshing={listhome.refershing} //是否正在加载
        onRefresh={refreshing}
        ListHeaderComponent={
          <Scollview ModalFun={upmodal} category={listhome.CATEGORY_LIST} />
        }
      />
      <CategoryModal ref={modal} category={listhome.CATEGORY_LIST} />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  fastlist: {
    width: '100%',
    height: '100%',
  },
  homelistitem: {
    width: (Sreenwidth - 18) / 2,
    borderRadius: 10,
    marginLeft: 6,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: 6,
  },
  boximg: {
    width: '100%', // 或者您希望的宽度
  },
  itemtital: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  userinfo: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    paddingBottom: 10,
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userinfoleft: {
    flexDirection: 'row',
    width: '50%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  userinforight: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  userinforightimg: {
    marginRight: 5,
    width: 20,
    height: 20,
  },
});
export default MainTab;
