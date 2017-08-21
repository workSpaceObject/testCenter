import React, {Component} from 'react';
import {Form, Input, Button,notification,Row,Col,Select,Upload} from 'antd';
import {connect} from 'dva';
import Styles from '../SelectTestPage/index.less';
import {Link} from 'dva/router';

const FormItem=Form.Item;
const Option = Select.Option;

class HelpEventPage extends Component {
  componentWillMount() {
      this.props.dispatch({type:'tcTestState/getAvailableTestsForHelp'})
  }
  componentDidMount(){

  }
  onUpdateState=(params)=>{
    this.props.dispatch({type:'tcTestState/updateState',payload:params})
  }
  downloadAnswer(params){
    this.props.dispatch({type:'tcTestState/downloadAnswer',payload:params})
  }

  render() {
  const {form,dispatch}=this.props;
  const {getFieldDecorator,getFieldValue}=form;
  const formItemLayout = {wrapperCol: {span: 18},labelCol:{span:6}};

    const onSubmit = (e)=> {
      e.preventDefault();
      form.validateFields((errs, formData)=> {
        if (!!errs) {
          return;
        }
       this.props.dispatch({type:'tcTestState/sendHelpEvent',payload:{...formData,helpType:parseInt(formData.helpType)}})
      });
    }

    //读取导入的答案（txt文件）
    function importText(file) {
      let renderFile=new FileReader();
      if(/text+/.test(file.type)){
        renderFile.onloadend = function() {
          dispatch({type:'tcTestState/updateOfflineAnses',payload:{anses:JSON.parse(unescape(renderFile.result)),type:'file'}})
        };
        renderFile.readAsText(file);
      }else {
        notification.err({message:'请导入text文件'});
      }
    }

    return (
      <div className={Styles.page}>
        <div style={{width:'50%',float:'left',marginTop:'16px'}}>
          <div className={Styles.boxdiv}>
            <span><span className={Styles.colork}> </span>远程求助</span>
            <Form layout="horizontal" onSubmit={onSubmit} style={{padding:30}}>
              <Form.Item label="登录信息" key="identifier" {...formItemLayout} >
                {getFieldDecorator('identifier',{rules: [{ required: true, max: 20, message: '请输入考生标识',whitespace:true },],})(
                  <Input  />
                )}
              </Form.Item>
              <FormItem
                {...formItemLayout}
                label="问题类型"
                hasFeedback
              >
                {getFieldDecorator('helpType', {
                  rules: [
                    { required: true, message: '请选择相关问题类型' },
                  ],
                })(
                  <Select size="large" placeholder="请选择相关问题类型">
                    <Option  value="1">不能登录</Option>
                    <Option  value="2">取消交卷</Option>
                    <Option  value="3">解锁机器</Option>
                    <Option  value="4">延长时间</Option>
                    <Option  value="9">其他</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="问题描述"
              >
                {getFieldDecorator('content', {
                  rules: [
                    { required: true, message: '请输入您的问题描述' },
                  ],
                })(
                  <Input type="textarea" placeholder="请输入您的问题描述" autosize={{ minRows: 6, maxRows: 6 }} />
                )}
              </FormItem>
              <div className={Styles.subback}>
                <Button size="large" style={{display:'block',marginRight:'40px'}} htmlType="submit" type="primary">提交</Button>
                <Link className="aBtnDefa" to="/" size="large">返 回</Link>
              </div>
              {/*<Row style={{position: 'absolute',width: '100%',height: 100,bottom: 0,background:' #E4F0FE',lineHeight:100,left:0}}><Col span={12}><Button size="large" style={{margin:'0 auto',display:'block'}} htmlType="submit" type="primary">提交</Button></Col><Col span={12}><Link className="aBtnDefa" to="/" size="large">返 回</Link></Col></Row>*/}
            </Form>
          </div>
        </div>
        <div style={{width:'50%',float:'left',marginTop:'16px'}}>
          <div className={Styles.boxdiv} style={{backgroundColor:'#E4F0FE'}}>
            <span><span className={Styles.colork}> </span>移机处理</span>
            <div className={Styles.buttondiv} style={{paddingTop:'6px'}}><Button  type="primary" onClick={()=>this.downloadAnswer(getFieldValue('identifier'))}> 导出</Button>　导出本机未上传的答案信息</div>
            <div className={Styles.buttondiv}><Upload  showUploadList={false} beforeUpload={(file)=>{importText(file);return false}}><Button className="aBtnDefa" >导入</Button></Upload>　导入上一台机器导出的答案信息</div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({tcTestState, loading})=>({tcTestState, loading: loading.global,}))(Form.create()(HelpEventPage));

