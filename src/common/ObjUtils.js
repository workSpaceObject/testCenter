export function getPropertyValue(item,property) {
  property = property.replace(/\[(\w+)\]/g, '.$1');//数组处理。
  property = property.replace(/^\./, '');  //去掉开始的点。
  var ps = property.split('.');
  let v=item;
  for(let p of ps){
    v=v[p];
    if(!v){
      return ;
    }
  }
  return v;
}
export function timeForamt(seconds){
  var hours=parseInt(seconds/3600);
  var minutes=parseInt((seconds-3600*hours)/60);
  var ses=seconds-3600*hours-minutes*60;

  return (hours<10?'0':'')+hours+':'+(minutes<10?'0':'')+minutes+':'+(ses<10?'0':'')+ses;

}
