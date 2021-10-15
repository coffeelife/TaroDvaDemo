import * as indexApi from './service';

 export default {
   namespace: 'index',
   state: {
     data: [1,2,3]
   },

   effects: {
     * effectsDemo(_, { call, put }) {
       const { status, data } = yield call(indexApi.demo, {});
       if (status === 'ok') {
         yield put({ type: 'save',
           payload: {
             topData: data,
           } });
       }
     },
   },

   reducers: {
     save(state, { payload }) {
       return { ...state, ...payload };
     },
   },

 };
