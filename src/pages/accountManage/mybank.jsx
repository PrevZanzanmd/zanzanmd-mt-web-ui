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
                                    <div>
                                        <img className="bankicon" src={require(`../../assets/img/images/zhongguobank.png`)}/>
                                        <span>中国银行</span>
                                    </div>
                                </div>
                                <div className="bank-oper">

                                </div>
                            </div>
                        </Col>
                        <Col span={12} className="bank-item">
                            <div className="bank-cont">
                                <div className="bank-name"></div>
                                <div className="bank-oper"></div>
                            </div>
                        </Col>
                        <Col span={12} className="bank-item">
                            <div className="bank-cont"></div>
                        </Col>
                    </Row>
                </Row>
            </div>
        )
    }
}

export default Mybank