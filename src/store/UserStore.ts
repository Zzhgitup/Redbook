import {login} from '../server/modules/user';
import {load, save} from '../utils/Storage';
import Loading from '../components/widget/Loading';
import {flow} from 'mobx';
class Userstore {
  useinfo: any;
  login = flow(function* (
    this: Userstore,
    name: string,
    pwd: string,
    callback: (res: boolean) => any,
  ) {
    try {
      Loading.show('正在登录');
      const data = yield login(name, pwd);
      if (data.code === 200) {
        this.useinfo = data.msg;
        //登录成功
        console.log(data);
        save('userinfo', JSON.stringify(this.useinfo));
        callback(true);
        Loading.hide();
      } else {
        console.log(data);
        this.useinfo = undefined;
        callback(false);
      }
    } catch (error) {
      console.log(error);
      callback(false);
    }
  });
}
export default new Userstore();
