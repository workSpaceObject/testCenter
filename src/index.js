import dva from 'dva';
import './index.html';
import './index.less';
import createLoading from 'dva-loading';
import { notification } from 'antd';

// 1. Initialize
const app = dva({...createLoading(),
  onError(err) {
    notification.info({message:err.message||"系统异常！！",});
    console.log(err.message);
    debugger;
  },
});
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));
app.model(require('./common/model'))

// 5. Start
app.start('#root');
