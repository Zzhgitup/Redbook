import HYrequest from '..';
export function login(username: string, password: string) {
  return HYrequest.get({
    url: `/user/login?name=${username}&pwd=${password}`,
  });
}
