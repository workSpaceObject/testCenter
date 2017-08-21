import React, {Component} from 'react';
import {Form, Button,Upload,Radio,Checkbox,Input,Icon,notification} from 'antd';
import {connect} from 'dva';
import HandPageModal from './handmodal';
import publicstyle from '../common/index.less';
import styles from './index.less';
import screenfull from 'screenfull';
import {urlpre} from '../utils/Constants';
import {timeForamt} from '../common/ObjUtils';
import Dimensions from 'react-dimensions'
import ItemsDiv from './itemsDiv';

class TestingPage extends Component {
  componentWillMount() {
    this.onGetPapers();
  }
  componentDidMount(){
    //考试倒计时
    const {dispatch}=this.props;
    this.interval=setInterval(this.time,1000);
    document.addEventListener('keydown',(event)=>this.onKeyDown(event))

    // window.onblur = function (e) {
    //   e = e || window.event;
    //   if (window.ActiveXObject && /MSIE/.test(navigator.userAgent)) {  //IE
    //     //如果 blur 事件是窗口内部的点击所产生，返回 false, 也就是说这是一个假的 blur
    //     var x = e.clientX;
    //     var y = e.clientY;
    //     var w = document.body.clientWidth;
    //     var h = document.body.clientHeight;
    //
    //     if (x >= 0 && x <= w && y >= 0 && y <= h) {
    //       window.focus();
    //       return false;
    //     }
    //   }else {
    //     screenfull.exit();
    //     dispatch({type:'tcTestState/increLeaveCnt',payload:{type:'/leaveWait'}})
    //   }
    // }
    window.addEventListener('onblur',(e)=>this.winonBulr(e))
  }
  componentDidUpdate(){
    const {countDown,}=this.props.tcTestState;
    if (countDown==0){
      clearInterval(this.interval);
      //执行交卷之前 先把countDown 设为 负数，防止执行多次交卷行为
      this.onUpdateState({countDown:-1})
      this.onDeployPaper();
    }else if(countDown==60){
      this.onGetLeaveSeconds();
    }
  }
  componentWillUnmount(){
    clearInterval(this.interval);
    this.props.dispatch({type:'tcTestState/updateState',payload:{countDown:9999}})
    document.removeEventListener("keydown",this.onKeyDowm);
    window.removeEventListener('onblur',this.winonBulr);
  }
  onKeyDown=(event)=> {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==116 ){
      //阻止网页刷新
      e.preventDefault();
    }else if(e && e.keyCode==122){
      //阻止浏览自身全屏
      e.preventDefault();
    }else if(e&&e.keyCode==123){
      //阻止F12
      e.preventDefault();
    }else if(e && e.keyCode==27){
      screenfull.exit();
      this.props.dispatch({type:'tcTestState/increLeaveCnt',payload:{type:'/leaveWait'}})
    }
  }
  winonBulr=(e)=>{
    e = e || window.event;
    if (window.ActiveXObject && /MSIE/.test(navigator.userAgent)) {  //IE
      //如果 blur 事件是窗口内部的点击所产生，返回 false, 也就是说这是一个假的 blur
      var x = e.clientX;
      var y = e.clientY;
      var w = document.body.clientWidth;
      var h = document.body.clientHeight;

      if (x >= 0 && x <= w && y >= 0 && y <= h) {
        window.focus();
        return false;
      }
    }else {
      screenfull.exit();
      this.props.dispatch({type:'tcTestState/increLeaveCnt',payload:{type:'/leaveWait'}})
    }
  }
  time=()=>{
    const {countDown}=this.props.tcTestState;
    this.props.dispatch({type:'tcTestState/countDown',payload:countDown-1})
  }
  onUpdateState = (params)=> {
    this.props.dispatch({type: 'tcTestState/updateState', payload: params});
  }
  onGetPapers=()=>{
    this.props.dispatch({type:'tcTestState/getTestPapers'})
  }

  //锚点跳转，不用#id跳转，防止react-route报错
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }
  onSaveAns=(params)=>{
    this.props.dispatch({type:'tcTestState/saveStudentAns',payload:params})
  }
  onSaveAnses=()=>{
    this.props.dispatch({type:'tcTestState/saveStudentAnses'})
  }
  onSaveAnsDoubt=(params)=>{
    this.props.dispatch({type:'tcTestState/saveStudentAnsDoubt',payload:params})
  }
  onSaveStudentAnsDoubts=()=>{
    this.props.dispatch({type:'tcTestState/saveStudentAnsDoubts'})
  }
  onDeployPaper=()=>{
    clearInterval(this.interval);
    this.props.dispatch({type:'tcTestState/deployPaper'})
  }
  onGetLeaveSeconds=(examinUid)=>{
    this.props.dispatch({type:'tcTestState/getLeaveSeconds',payload:examinUid})
  }
  render() {
    const {form,dispatch}=this.props;
    const {handVisible,leaveVisible,ansResults,ansDoubts,examinee,oldCountDown,test,testItems,countDown,leaveCnt,paperSects,againVisible,unit}=this.props.tcTestState;

    const handProps = {handVisible,againVisible,testItems,ansDoubts,ansResults, onDeployPaper:this.onDeployPaper,onCancel:()=>this.onUpdateState({handVisible:false,againVisible:false}),onUpdateState:this.onUpdateState};

    //每3分钟上传一次  未上传成功的答案
    if((oldCountDown-countDown)&&((oldCountDown-countDown)%180)==0){
      this.onSaveAnses();
      this.onSaveStudentAnsDoubts();
    }

    if(!screenfull.isFullscreen) {
      dispatch({type:'tcTestState/increLeaveCnt',payload:{type:'/leaveWait'}})
    }

    //试题导航
    const anchor=new Array();
    for(let index in testItems){
      let defaultValue=ansResults[index],isDoubt,Style={};
      isDoubt=ansDoubts.indexOf(parseInt(index))<0?false:true;
      if(isDoubt){
        Style={background:'#F99727',color:'#fff'};
      }else if(defaultValue){
        Style={background:'#4FBEF9',color:'#fff'};
      }
      anchor.push(<div className={styles.num} style={Style} onClick={()=>this.scrollToAnchor(String(index))}>{parseInt(index)+1}</div>)
    }

    //为试题、题号添加整体说明
    function getTestNum(start,end,sourse) {
      const testNum=new Array();
      for (let index=start;index<end;index++){
        testNum.push(sourse[index])
      }
      return testNum
    }

    let sectIndex=-1;
    let lastSectCnt=0;
    const testNum=paperSects&&paperSects.map(sect=>{
        sectIndex++
        sectIndex?lastSectCnt+=paperSects[sectIndex-1].itemCnt:lastSectCnt=0;
        return (
          <div className={styles.numsbj}>
            <div className={styles.topic}>
              <p style={{fontSize:14,color:'#000',padding:'7px'}}>{sect.title}</p>
            </div>
            <div style={{width:230}}>
              {sectIndex?getTestNum(lastSectCnt,lastSectCnt+sect.itemCnt,anchor):getTestNum(0,sect.itemCnt,anchor)}
            </div>
          </div>
        )
      })

    const itemsDivProps={paperSects,ansResults,testItems,ansDoubts,countDown ,onSaveAns:this.onSaveAns,onSaveAnsDoubt:this.onSaveAnsDoubt,getTestNum:getTestNum,}

    return (
        <div className={styles.page}  ref="page">
          {handVisible ? <HandPageModal {...handProps}/> : null}
          <a style={{display:'none'}} ref="start">start</a>
          {/*试卷考试头部    */}
          <div className={publicstyle.head}>
            <h3 className={publicstyle.papertitle}>{test.title}</h3>
            <div className={publicstyle.time}>
              <span style={{color:'#ffffff',fontSize:'16px',marginRight:'135px'}}>总题<span style={{fontSize:'24px'}}>{[...(testItems||[])].length}</span>道，已答<span style={{fontSize:'24px',color:'#fec400'}}>{[...(Object.keys(ansResults||{})||[])].length}</span>道，疑问<span style={{fontSize:'24px',color:'#f99727'}}>{[...(ansDoubts||[])].length}</span>道，未答<span style={{fontSize:'24px',color:'#ff4e00'}}> {[...(testItems||[])].length-[...(Object.keys(ansResults)||[])].length}</span>道</span>
              <span style={{color:'#ffffff',fontSize:'18px'}}>考试倒计时：<span style={{color:'#ffffff'}}>{ timeForamt(countDown)}</span></span>
            </div>
          </div>
          <div className={styles.papersbj} style={{height:this.props.containerHeight-180}}>

            {/*个人信息和题号     */}
            <div className={styles.nums}>
              <div className={styles.infoimg}>
                <img src={`${urlpre}/tc/getExamineeImg/${examinee.uid}/${examinee.imgVer}`}  alt=""  style={{width:'90px',height:'90px',borderRadius:'45px'}}/>
                <div style={{marginLeft:'10px'}}>
                  <p style={{color:'#333333',fontSize:'16px'}}>{examinee.name}</p>
                  {/*<p style={{color:'#666666',paddingTop:'10px'}}>{unit.title}</p>总分<span style={{color:'#FA9627',fontSize:'20px'}}>100</span>*/}
                </div>
              </div>
              <div style={{height:'45px',lineHeight:'40px',backgroundColor:'#E4F0FE',textAlign:'center',color:'#7F8284'}}>{unit.title}</div>
              {/*<div className={styles.infoname}>*/}
                {/*<h4>{examinee.name}</h4>*/}
              {/*</div>*/}
              {/*题号     */}
              <div style={{height:this.props.containerHeight-423,overflowY:'auto'}}>
                {testNum}
              </div>
              {/*我要交卷*/}
              <div className={styles.jumpb}>
                <Button className={publicstyle.button} type="primary"  size="large"   onClick={()=>this.onUpdateState({handVisible:true})}>我要交卷</Button>
              </div>

            </div>
            {/*试卷试题*/}
            <ItemsDiv {...itemsDivProps}/>
          </div>
        </div>
    );
  }
}
export default connect(({tcTestState,})=>({tcTestState,})) (Form.create()(Dimensions()(TestingPage)));


