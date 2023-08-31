import {getHomelist} from '../../../../server/modules/Home';
import {action, observable} from 'mobx';
import Toast from '../../../../components/widget/Toast';
import {load} from '../../../../utils/Storage';
import Loading from '../../../../components/widget/Loading';
export default class HomeStorage {
  page: number = 1;
  maxpage: number = 1;
  @observable CATEGORY_LIST: Category[] = [];
  @observable Homelist: ArticleSimple[] = [];
  @observable refershing: boolean = false;
  @action
  resetpage = () => {
    this.page = 1;
    this.requestHomelist();
  };
  requestHomelist = async () => {
    if (this.refershing) {
      return;
    }
    try {
      Loading.show('正在加载');
      this.refershing = true;
      //超出页码
      if (this.page > this.maxpage) {
        return;
      }
      //请求数据
      const res: {maxpage: number; list: any[]} = await getHomelist(
        this.page,
        5,
      );
      this.maxpage = res.maxpage;
      if (res.list.length) {
        if (this.page === 1) {
          this.Homelist = res.list;
        } else {
          this.Homelist = [...this.Homelist, ...res.list];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.Homelist = [];
        } else {
          //数据加载完毕
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
      this.refershing = false;
    }
  };
  getcategory = async () => {
    try {
      const res = await load('categorylist');
      if (res) {
        if (res.length) {
          this.CATEGORY_LIST = JSON.parse(res);
        } else {
          this.CATEGORY_LIST = DEFAULT_CATEGORY_LIST;
        }
      } else {
        this.CATEGORY_LIST = DEFAULT_CATEGORY_LIST;
      }
      console.log(this.CATEGORY_LIST);
    } catch (error) {
      console.log('requircategoryErroe', error);
      this.CATEGORY_LIST = [];
    }
  };
}
//频道数据 模拟接口返回的数据存在HomeStore
const DEFAULT_CATEGORY_LIST: Category[] = [
  // 默认添加频道
  {name: '推荐', default: true, isAdd: true},
  {name: '视频', default: true, isAdd: true},
  {name: '直播', default: true, isAdd: true},
  {name: '摄影', default: false, isAdd: true},

  {name: '穿搭', default: false, isAdd: true},
  {name: '读书', default: false, isAdd: true},
  {name: '影视', default: false, isAdd: true},
  {name: '科技', default: false, isAdd: true},

  {name: '健身', default: false, isAdd: true},
  {name: '科普', default: false, isAdd: true},
  {name: '美食', default: false, isAdd: true},
  {name: '情感', default: false, isAdd: true},

  {name: '舞蹈', default: false, isAdd: true},
  {name: '学习', default: false, isAdd: true},
  {name: '男士', default: false, isAdd: true},
  {name: '搞笑', default: false, isAdd: true},

  {name: '汽车', default: false, isAdd: true},
  {name: '职场', default: false, isAdd: true},
  {name: '运动', default: false, isAdd: true},
  {name: '旅行', default: false, isAdd: true},

  {name: '音乐', default: false, isAdd: true},
  {name: '护肤', default: false, isAdd: true},
  {name: '动漫', default: false, isAdd: true},
  {name: '游戏', default: false, isAdd: true},

  // 默认添加频道
  {name: '家装', default: false, isAdd: false},
  {name: '心理', default: false, isAdd: false},
  {name: '户外', default: false, isAdd: false},
  {name: '手工', default: false, isAdd: false},

  {name: '减脂', default: false, isAdd: false},
  {name: '校园', default: false, isAdd: false},
  {name: '社科', default: false, isAdd: false},
  {name: '露营', default: false, isAdd: false},

  {name: '文化', default: false, isAdd: false},
  {name: '机车', default: false, isAdd: false},
  {name: '艺术', default: false, isAdd: false},
  {name: '婚姻', default: false, isAdd: false},

  {name: '家居', default: false, isAdd: false},
  {name: '母婴', default: false, isAdd: false},
  {name: '绘画', default: false, isAdd: false},
  {name: '壁纸', default: false, isAdd: false},

  {name: '头像', default: false, isAdd: false},
];
