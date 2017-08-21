import React, {PropTypes} from 'react';
import {Modal,Row,Col,} from 'antd';

function HandPageModal({handVisible,againVisible,testItems,ansDoubts,ansResults={},onDeployPaper, onCancel,onUpdateState}){
  const modalOpts = {
    title: "确认交卷",
    wrapClassName: 'handmodal',
    visible: handVisible,
    width: 530,
    closable:true,
    maskClosable: false,
    onOk:againVisible?()=>onDeployPaper():()=>onUpdateState({againVisible:true}),
    okText: '我要交卷',
    onCancel,
    cancelText:'继续答题',
  };
  //console.log(doubCnt)
  return (
    <Modal {...modalOpts}>
      {/*<img src={require('../assets/tipcoin.png')} style={{float:'left'}} alt=""/>*/}
      {/*<div style={{display: 'flex',alignItems: 'center', height: '140px',marginRight: '20px'}}>*/}
        {/*<h3 style={{color:'#000',fontSize:'17px'}}>存在<span style={{color:'#ff1e00'}}> 1 </span>道标记题,<span style={{color:'#ff1e00'}}> 10 </span>道未完成题，您是否确认提交试卷？</h3>*/}
      {/*</div>*/}
      <img src={againVisible?require('../assets/tipscoin.png'):require('../assets/tipcoin.png')} style={{float:'left'}} alt=""/>
      <div style={{display: 'flex',alignItems: 'center', height: '140px',marginRight: '20px'}}>
        {againVisible?<h3 style={{color:'#000',fontSize:'17px'}}><span style={{color:'#ff1e00'}}> 再次提醒： </span>交卷后将不能再进行答题，您确定要交卷吗？</h3>:<h3 style={{color:'#000',fontSize:'17px'}}>存在<span style={{color:'#ff1e00'}}> {[...(ansDoubts||[])].length} </span>道标记题,<span style={{color:'#ff1e00'}}> {[...(testItems||[])].length-[...(Object.keys(ansResults)||[])].length} </span>道未完成题，您是否确认提交试卷？</h3>}
      </div>
    </Modal>
  );
}
export default HandPageModal;
