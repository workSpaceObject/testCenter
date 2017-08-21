import React, {Component} from 'react';
import {connect} from 'dva';
import Styles from '../SelectTestPage/index.less';
import styles from './index.less';
import {Link} from 'dva/router';

class EventWaitPage extends Component {
  componentWillMount() {
    this.getReply();
  }
  componentDidMount(){
    this.interval=setInterval(this.getReply,10000);
  }
  componentDidUpdate(){


  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  getReply=()=>{
    this.props.dispatch({type:'tcTestState/getReplyedHelpEvent'})
  }
  onUpdateState=(params)=>{
    this.props.dispatch({type:'tcTestState/updateState',payload:params})
  }
  /*    width: 220px;
   background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAcCAYAAADmx7QjAAAAGXRFW…+wEL4NQDn4DoXTSJUAvwHNgsTXAtwXJL4a4FS44iP7J8AAAsLjVaMW8BIAAAAASUVORK5CYII=);
   float: left;
   margin-top: 275px;
   margin-left: 63px;*/
  render() {
    return (
      <div className={Styles.page} style={{width:1200,height:578,padding:0,position:'relative',overflow:'hidden'}}>
        <div className={styles.waitRotate}>
          <img src={require('../assets/helpWait1.png')} />
          <img src={require('../assets/Computer.png')} alt=""/>
          <div><p>您正在远程求助，问题已提交</p><p>请等待处理...</p></div>
        </div>
        <div className={styles.waitSlidMove}></div>
        <div className={styles.waitPenPaper}>
          <img src={require('../assets/waitPaper.png')} />
          <img src={require('../assets/waitPen.png')} alt=""/>
        </div>
        <img className={styles.waittingRate} src={require('../assets/waiting.png')} />
        <Link style={{position:'absolute',bottom:40,right:45}} to="/" className="aBtn">返回登录</Link>
      </div>
    );
  }
}
export default connect(({tcTestState}) => ({tcTestState}))(EventWaitPage);


