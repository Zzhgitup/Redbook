import React, {
  FC,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Modal,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './style';
import {icon_arrow} from '../../asset/date/image';
interface Props {
  name?: string;
  category: Category[];
}
export interface CateIroot {
  ModalUp: () => void;
  Modalclose: () => void;
}
const CategoryModal = forwardRef<CateIroot, Props>((props, ref) => {
  const {category} = props;
  const [show, setshow] = useState(false);
  const [isAdd, setisAdd] = useState<Category[]>([]);
  const [edit, setedit] = useState(false);
  const [NoisAdd, setNoisAdd] = useState<Category[]>([]);
  useEffect(() => {
    //初始化数据
    const isAddlist = category.filter((item: Category) => {
      return item.isAdd;
    });
    const NoisAddlist = category.filter((item: Category) => {
      return !item.isAdd;
    });
    setisAdd(isAddlist);
    setNoisAdd(NoisAddlist);
  }, [category]);
  //暴露出弹窗方法
  useImperativeHandle(ref, () => {
    return {
      ModalUp: () => {
        setshow(true);
      },
      Modalclose: () => {
        setshow(false);
      },
    };
  });
  const hide = () => {
    setshow(false);
  };
  //添加到我的频道
  const addMychannel = (channel: Category) => {
    //TODU
    const copyNoisadd = [...NoisAdd];
    const copyisadd = [...isAdd];
    const newNoisadd = copyNoisadd.filter((item: Category) => {
      return item.name !== channel.name;
    });
    setNoisAdd(newNoisadd);
    copyisadd.push(channel);
    setisAdd(copyisadd);
  };
  //从我的频道删除，移动到推荐频道
  const deleteRecommed = (channel: Category) => {
    //TODU
    if (!edit) return;
    const copyNoisadd = [...NoisAdd];
    const copyisadd = [...isAdd];
    const newNoisadd = copyisadd.filter((item: Category) => {
      return item.name !== channel.name;
    });
    setisAdd(newNoisadd);
    copyNoisadd.push(channel);
    setNoisAdd(copyNoisadd);
  };
  return (
    <Modal
      visible={show}
      transparent={true} /* 背景 */
      statusBarTranslucent={true} /* 状态栏状态 */
      animationType="fade" /* 动画类型 */
      onRequestClose={hide} /* 系统返回，执行回调 */
    >
      <View
        style={[
          styles.Moadlview,
          {marginTop: 50 + (StatusBar.currentHeight || 0)},
        ]}>
        <View style={styles.ModalContent}>
          <View style={styles.Popheader}>
            <Text style={styles.myarea}>我的频道</Text>
            <TouchableOpacity>
              <Text>点击进入频道</Text>
            </TouchableOpacity>
            <View style={styles.Popheaderrigth}>
              <TouchableOpacity
                onPress={() => {
                  setedit(!edit);
                }}>
                <Text style={styles.Buttonidor}>
                  {edit ? '退出编辑' : '进入编辑'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: 25, height: 25}} onPress={hide}>
                <Image style={styles.Buttonimg} source={icon_arrow} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.recommed}>
            {isAdd.map((item: Category) => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => {
                    deleteRecommed(item);
                  }}>
                  <View
                    style={[
                      styles.recommenditem,
                      item.default ? styles.defaultitem : null,
                    ]}>
                    <Text style={styles.text}>
                      {edit ? (
                        <Text style={{fontWeight: '400', fontSize: 18}}>
                          {' '}
                          -{' '}
                        </Text>
                      ) : null}
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.Popheader}>
            <Text style={styles.myarea}>推荐频道</Text>
            <TouchableOpacity>
              <Text>点击添加频道</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recommed}>
            {NoisAdd.map((item: Category) => {
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => {
                    addMychannel(item);
                  }}>
                  <View
                    style={[
                      styles.recommenditem,
                      item.default ? styles.defaultitem : null,
                    ]}>
                    <Text style={styles.text}>
                      <Text style={{fontWeight: '400', fontSize: 18}}>+ </Text>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.mask}>
          <></>
        </View>
      </View>
    </Modal>
  );
});

export default CategoryModal;
