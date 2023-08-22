import {login} from '../server/modules/user';
import {save} from '../utils/Storage';
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
      const data = yield login(name, pwd);
      if (data.code === 200) {
        this.useinfo = data.msg;
        //登录成功
        save('userinfo', JSON.stringify(this.useinfo));
        callback(true);
      } else {
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
