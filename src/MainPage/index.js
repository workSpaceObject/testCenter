import React, {Component} from 'react';
import publicstyle from '../common/index.less';

class MainPage extends Component {
  componentWillMount() {

  }
  componentDidMount(){

  }
  render() {

    return (
      <div className={publicstyle.page}>
        <header><h3 className={publicstyle.title}>智能化考试平台</h3></header>
        <div className={publicstyle.jbt} style={{paddingBottom:'70px'}}>考试端</div>
        {this.props.children}
        <footer>
          <p style={{textAlign:'center',color:'#999999'}}>技术支持：北京云翼互联科技有限公司</p>
        </footer>
      </div>
    );
  }
}
export default MainPage;


