import HYrequest from '..';
export function getArticle(id: string) {
  return HYrequest.get({
    url: '/article/articleDetail',
    params: {
      id: id,
    },
  });
}
