import {urlpre} from '../utils/Constants';
import {get,post,fileUpload} from 'request';

export async function getTestInfo(params){
  return post(`${urlpre}/ts/getTestInfo`,params,false);
}


