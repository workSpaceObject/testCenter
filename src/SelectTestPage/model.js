import {getTestInfo} from  './service';
import {routerRedux} from 'dva/router';
import {combineExtProperties} from 'devutils';
import {notification} from 'antd';

export default {
  namespace: 'tcSelectTestState',
  state: {
    testInfos:{},
    examinees:[],
    ansResults:{},
    examinee:{},
    test:{},
    testItems:[],
    waitSeconds:0,
  },

  effects: {
    *selectTest({payload},{call,put,select}){
      const {curUser} = yield select(({tcTestState}) =>tcTestState);
      const idCard=payload.identifier||curUser.identifier;
      const {data}=yield call(getTestInfo,payload);
      if(data){
        const {testInfos,examinees}=data.data;
        yield put({type:'tcTestState/updateState',payload:{curUser:{identifier:idCard}}})
        yield put({type:'updateState',payload:{...data.data,}});
        if(testInfos){
          combineExtProperties(examinees,testInfos,{title:'',testFrom:'',testTo:'',isImediateTest:null},'testId')
          yield put({type:'updateState',payload:{examinees}})
          yield put(routerRedux.replace({pathname: '/select'}));
        }else {
          yield put(routerRedux.replace({pathname: '/begin'}));
        };
      }
    },

  },

  reducers: {
    updateState(state, {payload}){
      return {...state, ...payload};
    },


  },

}

