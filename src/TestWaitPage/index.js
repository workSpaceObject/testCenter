import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import {connect} from 'dva';
import publicstyle from '../common/index.less';
import styles from '../EventWaitPage/index.less';
import {urlpre} from '../utils/Constants';
import {Link} from 'dva/router';
import {getPropertyValue,timeForamt} from '../common/ObjUtils';

class TestWaitPage extends Component {
  componentWillMount() {
    this.props.dispatch({type:'tcTestState/getTestPapers',payload:{}})
  }
  componentDidMount(){
    this.interval=setInterval(this.time,1000);

  }
  componentDidUpdate(){
    const {dispatch}=this.props;
    const {waitSeconds}=this.props.tcTestState;
    if (waitSeconds==0){
      dispatch({type:'tcTestState/enterTest'})
    }
  }
  componentWillUnmount(){
    clearInterval(this.interval);
    this.props.dispatch({type:'tcTestState/updateState',payload:{waitSeconds:1000}})
  }

  time=()=>{
    const {waitSeconds}=this.props.tcTestState;
    this.props.dispatch({type:'tcTestState/updateState',payload:{waitSeconds:waitSeconds-1}})
  }
  render() {
    const {loading,dispatch}=this.props;
    const {examinee,test,waitSeconds}=this.props.tcTestState;
    return (
      <div className={publicstyle.page}>
        <h3 className={publicstyle.title}>智能化考试平台</h3>
        <div className={publicstyle.jbt}>考试端</div>
        <div className={publicstyle.waitingBox} style={{height:'516px',width:'1067px',paddingTop:'10%',marginBottom:'10%'}} >
          <h3 className={styles.djstime}>{waitSeconds<0?"正在登录。。。":''}<span style={{color:'#ff6c00'}}>{waitSeconds<0?'':timeForamt(waitSeconds)}</span></h3>
          <p style={{position:'absolute',right:'20px',bottom:'70px',fontSize:'17px',color:'#fff'}}>{test.title}</p>
          <Link to="/examin" style={{position:'absolute',right:'20px',bottom:'42px',fontSize:'15px',color:'#fff'}}>返回</Link>
        </div>
        <div style={{}}>
          <p style={{textAlign:'center',color:'#999999'}}>技术支持：北京云翼互联科技有限公司</p>
        </div>

      </div>

    );
  }
}
export default connect(({tcTestState,loading}) => ({tcTestState,loading:loading.global}))(TestWaitPage);
