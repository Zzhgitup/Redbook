export function Handerphone(tel: string) {
  let value = tel.replace(/\s+/g, ''); //去掉首位空格
  const tirm = [value.slice(0, 3), value.slice(3, 7), value.slice(7, 11)];
  return tirm.filter(item => item !== '').join(' ');
}
export function backHander(tel: string) {
  return tel.replace(/\s+/g, '');
}
