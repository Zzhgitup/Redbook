import {observable} from 'mobx';
import {getArticle} from '../../server/modules/Article';
//文章详情获取
export default class ArticelDetilStore {
  @observable ArticelDetil: Article | undefined;
  requsetArticelDetil = async (id: string) => {
    try {
      const res = await getArticle(id);
      this.ArticelDetil = res;
    } catch (error) {
      return null;
    }
  };
  getrticel = () => {
    if (this.ArticelDetil) {
      return this.ArticelDetil;
    } else {
      return {};
    }
  };
}
