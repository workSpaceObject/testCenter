import React, {Component} from 'react';
import {Form, Row, Col, Button,Modal,Tabs} from 'antd';
import {connect} from 'dva';
import publicstyle from '../common/index.less';
import styles from './index.less';

class TestOverPage extends Component {
  componentWillMount() {

  }
  render() {
    const {form}=this.props;
    return (
      <div style={{background:'#E2E5EC'}}>
        {/*试卷考试头部    */}
        <div className={publicstyle.head}>
          <h3 className={publicstyle.papertitle}>车工初级理论知识笔试<span className={publicstyle.zscore} style={{}}> 总分 100分</span></h3>
          <div className={publicstyle.time}>
            <span style={{color:'#1781b3',fontSize:'18px'}}>剩余时间：<span style={{color:'#ffffff'}}>01:20:50</span></span>
            <Form layout="horizontal">
              <Button className={publicstyle.button} key="loginBtn" size="large"  htmlType="submit">我要交卷</Button>
            </Form>
          </div>
        </div>
        {/*考试结束内容*/}
        <div className={styles.overcon}>
            <div className={styles.con}>
              <img src={require('../assets/endcoin.png')} className={styles.endimg} alt=""/>
              <div className={styles.endinfo}>
                <div className={styles.scoren}>你的得分<a className={styles.scores}>80</a>分</div>
                <div className={styles.scoren} style={{fontSize:'20px'}}>谢谢你的参与，点击按钮退出考试系统</div>
                <Form layout="horizontal">
                  <Button className={publicstyle.button} style={{width:'170px',height:'50px',backgroundColor:'#FF9D1C'}} key="loginBtn" size="large"  htmlType="submit">退出考试</Button>
                </Form>
              </div>
            </div>
        </div>
      </div>
    );
  }

}
export default Form.create()(TestOverPage);
