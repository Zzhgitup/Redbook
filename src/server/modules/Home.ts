import HYrequest from '..';
export function getHomelist(page: number, size: number) {
  return HYrequest.get({
    url: '/home/homeList',
    params: {
      page: page,
      size: size,
    },
  });
}
