import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import {connect} from 'dva';
import publicstyle from '../common/index.less';
import styles from './index.less';
import {urlpre} from '../utils/Constants';
import {Link} from 'dva/router';
import {getPropertyValue,timeForamt} from '../common/ObjUtils';

class BeginPage extends Component {
  componentWillMount() {
    this.onSelectTest({});
  }
  componentDidMount(){
  }
  componentWillUnmount(){
    this.props.dispatch({type:'tcTestState/updateState',payload:{waitSeconds:1000}})
  }
  onSelectTest=(params)=>{
      this.props.dispatch({type:'tcTestState/getTestInfo',payload:params})
  }
render() {
  const {loading,dispatch}=this.props;
  const {examinee,test}=this.props.tcTestState;
    return (
        <div className={publicstyle.loginBox} style={{height:'500px',width:'1100px'}}>
          <div className={publicstyle.boximg} style={{width:'70%'}}>
            <p className={styles.title}>{test.title}</p>
        {/*倒计时    */}
            <div className={styles.Countdown} style={{marginTop:'10px'}}>
              <span style={{color:'#6BBEAA',fontSize:'33px',float:'left',lineHeight:'60px'}} className="iconfont">&#xe6bb;</span>
              <div className={styles.time}>
                <span style={{color:'#666666',fontSize:14}}>考试时间</span>
                <p style={{color:'#423F38',fontSize:16}}>{test.testFrom} 至 {test.testTo}</p>
              </div>
            </div>
            <div className={styles.Countdown}>
              <img src={require('../assets/timel.png')} style={{float:'left',marginTop:'14px'}}/>
              {/*<span style={{color:'#C5C5C5',fontSize:'33px',float:'left',lineHeight:'60px'}} className="iconfont">&#xe73c;</span>*/}
              <div className={styles.time}>
                <span style={{color:'#666666',fontSize:14}}>考试时长</span>
                <p style={{color:'#423F38',fontSize:16}}>{test.testMinutes}分钟</p>
              </div>
            </div>
     {/*考试要求       */}
            <div className={styles.requirements}>
                <p className={styles.retitle}><span style={{color:'#fff',fontSize:'15px',float:'left',textIndent:'13px'}} className="iconfont">&#xe67e;</span>考试要求</p>
                <div style={{backgroundColor:'#E4F0FE'}}>
                  <article style={{lineHeight:'25px',fontSize:'12px',padding:'10px 0px 20px 17px'}}>
                    1、景点试题抽取一次有效，考生不得要求更换；<br/>
                    2、考生可备考5分钟，期间不得离开备考室；<br/>
                    3、景点讲解和随机问答中文类在15分钟以内，外语类在25分钟以内；<br/>
                    4、外语类考生须用所报考的语言全程进行面试，并对“口译”题进行翻译；<br/>
                    5、考试期间不得要求考官作任何提示；<br/>
                    6、考生自我介绍时不得以任何方式向考官明示或暗示自己的真实姓名及单位，须采用规定的格式介绍自己。
                  </article>
                </div>
            </div>
          </div>
      {/*右边个人准考信息    */}
          <div className={publicstyle.boxLeft} style={{width:'29.95%'}}>
            <div className={styles.perimginfo}>
              <img src={`${urlpre}/tc/getExamineeImg/${examinee.uid}/${examinee.imgVer}`} alt=""  style={{width:'120px',height:'140px'}}/>
            </div>
            <div style={{height:'34%'}}>
              <Row className={styles.info}>
                <Col span={8}>姓名：</Col>
                <Col span={16}>{examinee.name}</Col>
              </Row>
              <Row className={styles.info}>
                <Col span={8}>考生标识：</Col>
                <Col span={16}>{examinee.identifier}</Col>
              </Row>
            </div>
            <Link style={{marginTop:15,  width: 165}} className="aBtn" to="/testWait" size="large">信息无误，进入考试</Link>
            <Link style={{marginTop:15}} className="aBtnDenger" to="/" size="large">信息有误，返回登录</Link>
          </div>
        </div>
    );
  }
}
export default connect(({tcTestState,loading}) => ({tcTestState,loading:loading.global}))(BeginPage);


