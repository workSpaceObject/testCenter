import React, {Component} from 'react';
import {connect} from 'dva';
import Styles from '../SelectTestPage/index.less';
import {Link} from 'dva/router';
import ReactDOM from 'react-dom';
import screenfull from 'screenfull';
import {Button} from 'antd';


class LeaveWaitPage extends Component {
  componentWillMount() {
    this.props.dispatch({type:'tcTestState/getTestPapers'})
  }
  componentDidMount(){
    this.interval=setInterval(this.time,1000);
    let login=ReactDOM.findDOMNode(this.refs.contion);
    login.addEventListener('click',() => {
      clearInterval(this.interval);
      screenfull.request();
      this.props.dispatch({type:'tcTestState/increLeaveCnt',payload:{type:'/testing'}})
    });
  }
  componentDidUpdate(){
    const {leaveWaitSecond,}=this.props.tcTestState;
    if (leaveWaitSecond==0){
      clearInterval(this.interval);
      this.props.dispatch({type:'tcTestState/increLeaveCnt',payload:{}})
    }
  }
  time=()=>{
    const {leaveWaitSecond}=this.props.tcTestState;
    this.props.dispatch({type:'tcTestState/updateState',payload:{leaveWaitSecond:leaveWaitSecond-1}})
  }
  componentWillUnmount(){
    clearInterval(this.interval);
    this.props.dispatch({type:'tcTestState/updateState',payload:{leaveWaitSecond:5}})
  }

  onUpdateState=(params)=>{
    this.props.dispatch({type:'tcTestState/updateState',payload:params})
  }
  contion=()=>{
    this.props.dispatch({type:'tcTestState/increLeaveCnt',payload:{type:'/testing'}})
  }

  render() {
    const {dispatch}=this.props;
    const {leaveVisible,leaveWaitSecond,oldMaxLeaveCnt,leaveCnt}=this.props.tcTestState;
    return (
      <div className={Styles.page} style={{width:1200,height:578,padding:0,position:'relative',overflow:'hidden'}}>
        {!leaveVisible?<div style={{width:'80%',margin:'30px auto',textAlign:'center'}} >
          <img src={require('../assets/leave.png')} alt=""/>
          <h5 style={{fontSize:20,margin:25}}>请您赶快进入考试，否则将被记录离开考试一次。</h5>
          <div className={Styles.leavewaitMiao}>
            <span style={{fontSize: 30,fontWeight:' bold'}}>{leaveWaitSecond}</span>
          </div>
        </div>:<div style={{textAlign:'center',marginTop:60}}>
          <img src={require('../assets/leaveMess.png')} alt=""/>
          <p style={{position:'absolute',top: 175,left: 528,fontSize: 25}}>您已经离开考试<i style={{color:'#F39800',fontSize:37,fontWeight:'bold',}}> {leaveCnt||0} </i>次</p>
        </div>}
        <Button style={{position:'absolute',bottom:96,right:'45%'}} type="primary" ref="contion">知道了，继续答题</Button>
        {leaveVisible?<span  style={{position:'absolute',bottom:67,right:'40%',color:'red'}}>注意：离开考试{oldMaxLeaveCnt}次，似为有作弊行为，将强制交卷！</span>:''}
      </div>
    );
  }
}
export default connect(({tcTestState}) => ({tcTestState}))(LeaveWaitPage);


