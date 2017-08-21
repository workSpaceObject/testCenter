import React, {Component} from 'react';
import {Button, Row, Col,Icon,} from 'antd';
import {connect} from 'dva';
import publicstyle from '../common/index.less';
import Styles from './index.less';
import screenfull from 'screenfull';
import ReactDOM from 'react-dom';

class SelectTestPage extends Component {
  componentWillMount() {
    this.onSelectTest({});
  }
  componentDidMount(){
     //为login添加监听事件（‘click’），点击后网页全屏
    let intoPaper=ReactDOM.findDOMNode(this.refs.intoPaper);
    intoPaper.addEventListener('click',() => {
      if (screenfull.enabled) {
        screenfull.request();
      } else {
        // Ignore or do something else
      }
    });
  }

  onSelectTest=(examineeUid)=>{
    this.props.dispatch({type:'tcTestState/getTestInfo',payload:examineeUid})
  }

render() {
    const {testInfos,examinees}=this.props.tcTestState;

    const divCon=examinees&&examinees.map(data=>{
      return (
        <div className={Styles.testlistDiv}>
          <div  key={data.uid}>
            <h3 style={{marginBottom:10,textAlign:'center'}}>{data.title}</h3>
            <div className={Styles.testTitle}>
              <p ><img src={require('../assets/selectstart.png')} style={{float:'left',padding:'0px 10px 0px 60px'}}/>{data.testFrom}</p>
              {/*<p ><span className="iconfont">&#xe607;</span></p>*/}
              <p ><img src={require('../assets/selectend.png')} style={{float:'left',padding:'0px 10px 0px 60px'}}/>{data.testTo}</p>
            </div>
            {/*<p style={{fontSize:15,color:'#666',}}>考试模式：{data.isImediateTest!=null?data.isImediateTest?'即到即考':'集体考试':''}</p>*/}
          </div>
          <Button style={{margin:'15px auto 0px',display: 'block'}} ref="intoPaper" onClick={()=>this.onSelectTest({examineeUid:data.uid})}>点击进入</Button>
        </div>
      )
    })

    return (
        <div className={Styles.page}>
          <span style={{color:'#333',fontSize:'22px',display:'block',textAlign:'center',height: 145,lineHeight:'110px'}}>您当前有<span style={{color:'#F39801',fontSize:'45px'}}>{examinees.length}</span>场考试可以进行，请选择要进行的考试</span>
          <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            {divCon}
          </div>
        </div>
    );
  }
}
export default connect(({tcTestState}) => ({tcTestState}))(SelectTestPage);


