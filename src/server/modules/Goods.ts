import HYrequest from '..';
export function getgoods() {
  return HYrequest.get({
    url: '/goods/goodsList',
    params: {
      page: 1,
      size: 10,
    },
  });
}
