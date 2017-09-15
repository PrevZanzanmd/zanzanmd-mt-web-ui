import React from 'react'
import {Row, Col} from 'antd'
import BCrumb from '../Components/bCrumb.jsx'

class Mybank extends React.Component {
    constructor(props) {
        super(props)
    }

    render = _ => {
        return (
            <div>
                <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
                <Row style={{background: '#fff', paddingTop: 20}}>
                    <Row className="bank-wrapper">
                        <Col span={12} className="bank-item">
                            <div className="bank-cont">
                                <div className="bank-name">
                                    <div className="bank-which">
                                        <img className="bankicon"
                                             src={require(`../../assets/img/images/zhongguobank.png`)}/>
                                        <span>中国银行</span>
                                    </div>
                                    <div className="bank-num">
                                        <span>尾号6666</span>
                                        <img className="bank-type"
                                             src={require(`../../assets/img/images/chuxucart.png`)}/>
                                    </div>
                                </div>
                                <div className="bank-oper">
                                    <img src={require(`../../assets/img/images/kuaijie.png`)}/>
                                    <span className="bank-remove">删除</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12} className="bank-add">
                            <div className="bank-addcont">
                                <img src={require(`../../assets/img/images/add.png`)}/>
                                <p className="bank-addtext">添加银行卡</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
        )
    }
}

export default Mybank