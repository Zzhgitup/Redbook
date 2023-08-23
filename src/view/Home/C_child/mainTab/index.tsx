import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {observer, useLocalStore} from 'mobx-react';
import HomeStorage from './HomeStore';
import ResizeImg from './ResizeImag';
import FlowList from '../flowlist/FlowList.js';
import Headr from './C_child/Head';
interface Props {
  name?: string;
}
const {width: Sreenwidth} = Dimensions.get('screen');
const MainTab: FC<Props> = observer(() => {
  const listhome = useLocalStore(() => new HomeStorage());
  useEffect(() => {
    listhome.requestHomelist();
  }, [listhome.Homelist]);
  const refreshing = () => {
    listhome.resetpage();
    listhome.requestHomelist();
  };
  const renderkey = (item: ArticleSimple, index: number): string => {
    return item.userName + Math.random();
  };
  const renderitem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
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
    );
  };
  const loadnewDate = () => {
    listhome.requestHomelist();
  };
  const Listfooter = () => {
    const styles = StyleSheet.create({
      contrains: {
        width: 300,
        height: 300,
      },
    });
    return (
      <View style={styles.contrains}>
        <Headr size={50} defaultfoucus={false} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlowList
        style={styles.fastlist}
        data={listhome.Homelist}
        renderItem={renderitem}
        numColumns={2}
        keyExtractor={renderkey}
        onEndReachedThreshold={0.1}
        onEndReached={loadnewDate} //触发更新
        refreshing={listhome.refershing} //是否正在加载
        onRefresh={refreshing}
        ListFooterComponent={Listfooter}
      />
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
    paddingTop: 10,
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
