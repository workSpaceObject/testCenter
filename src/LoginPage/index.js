import React, {Component} from 'react';
import {Form, Input, Button,Icon,Row,Col} from 'antd';
import {connect} from 'dva';
import styles from './index.less';
import screenfull from 'screenfull';
import ReactDOM from 'react-dom';
import {Link} from 'dva/router';

class LoginPage extends Component {
  componentWillMount() {
      this.props.dispatch({type:'tcTestState/getUnitSetting'})
  }
  componentDidMount(){
    //为login添加监听事件（‘click’），点击后网页全屏
    let login=ReactDOM.findDOMNode(this.refs.login);
    login.addEventListener('click',() => {
      if (screenfull.enabled) {
        screenfull.request();
      } else {
        // Ignore or do something else
      }
    });
  }
  render() {
  const {form}=this.props;
  const {getFieldDecorator,getFieldValue}=form;
 const formItemLayout = {wrapperCol: {span: 24},};

    const onSubmit = (e)=> {
      e.preventDefault();
      form.validateFields((errs, data)=> {
        if (!!errs) {
          return;
        }

        this.props.dispatch({type: 'tcTestState/login', payload: data});
      });
    }

    return (
     <div>

       <div className="loginBox">
         <Row style={{height:480}}>
           <Col span={14} style={{textAlign:'center'}}>
             <img src={require('../assets/loginleft.png')} style={{width:'73%',display:'block',margin:'80px auto'}} alt=""/>
           </Col>
           <Col span={10}>
             <div className={styles.testAd}>
               <h3 style={{textAlign:'center',color:'#3692DB',width:'100%'}}>用户登录</h3>
               <Form layout="horizontal" onSubmit={onSubmit} style={{background:'#fff',height:75}}>
                     <Form.Item  key="identifier" {...formItemLayout}>
                         {getFieldDecorator('identifier',{rules: [{ required: true, max: 20, message: '请输入考生标识',whitespace:true },],})(
                         <Input  style={{height:40,marginTop:'35px',textIndent:10}} prefix={<span style={{color:'#BCBCBC'}} className="iconfont">&#xe675;</span>}/>
                       )}
                     </Form.Item>
                 <Row>
                   <Col span={24} >
                     <Link to="/helpEvent"><a  style={{float:'right'}}>远程求助 / 移机处理</a></Link>
                   </Col>
                 </Row>
                 <Button htmlType="submit" style={{height:37,width:'100%',marginTop:'50px',fontSize:17}} ref="login" type="primary">登录</Button>
                 <p style={{textAlign:'center',color:'#999999',position:'absolute',bottom:'10px',left:'54px'}}>技术支持：北京云翼互联科技有限公司</p>
               </Form>
             </div>
           </Col>
         </Row>

       </div>
     </div>
    );
  }
}
export default connect(({tcTestState, loading})=>({tcTestState, loading: loading.global,}))(Form.create()(LoginPage));

