import React, {Component} from 'react';
import {Button, Row, Col,Icon,} from 'antd';
import {connect} from 'dva';
import Styles from '../SelectTestPage/index.less';
import {Link} from 'dva/router';

class EventPage extends Component {
  componentWillMount() {
    this.getReply();
  }
  componentDidMount(){

  }
  componentDidUpdate(){
    const {isReply,phtml}=this.props.tcTestState;
    if (!isReply||phtml){
      clearInterval(this.interval);
    }else {
      this.interval=setInterval(this.getReply,10000);
    }
  }
  componentWillUnmount(){
    clearInterval(this.interval);
    this.props.dispatch({type:'tcTestState/updateState',payload:{isReply:false}})
  }
  getReply=()=>{
    const {isReply,phtml}=this.props.tcTestState;
    if(isReply){
      this.props.dispatch({type:'tcTestState/getReplyedHelpEvent'})
    }
  }
  onUpdateState=(params)=>{
    this.props.dispatch({type:'tcTestState/updateState',payload:params})
  }
  onDeployPaper=()=>{
    this.props.dispatch({type:'tcTestState/deployPaper'})
  }
  render() {
    const {eventImg,btnIsShow,phtml,deployBtn}=this.props.tcTestState;

    return (
      <div className={Styles.page} style={{width:1000,height:430,padding:0,position:'relative'}}>
        <img style={{width:736,height:424,display:'block',marginLeft:138}} src={require(`../assets/${eventImg}`)} alt=""/>
        <div style={{width:756,height:428,position:'absolute',top:0,left:129}}>
          <div style={{height:370}} dangerouslySetInnerHTML={{__html:phtml}}>
          </div>
          {btnIsShow?<Link to="/" className="aBtn">返回登录</Link>:null}
          {deployBtn?<Button type="primary" style={{display:'block',margin:'-43px auto', width: 120}} onClick={()=>this.onDeployPaper()}>再次交卷</Button>:null}
        </div>
      </div>
    );
  }
}
export default connect(({tcTestState}) => ({tcTestState}))(EventPage);


