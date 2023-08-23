import {getHomelist} from '../../../../server/modules/Home';
import {action, observable} from 'mobx';
export default class HomeStorage {
  page: number = 1;
  maxpage: number = 1;
  @observable Homelist: ArticleSimple[] = [];
  @observable refershing: boolean = false;
  @action
  resetpage = () => {
    this.page = 1;
    this.requestHomelist();
  };
  requestHomelist = async () => {
    if (this.refershing) {
      console.log('正在加载');
      return;
    }
    try {
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
      this.refershing = false;
    }
  };
}
