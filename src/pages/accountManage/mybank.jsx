import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Spin } from 'antd'
import BCrumb from '../Components/bCrumb.jsx'
import { getBankType } from '../../fetchApi/commonApi'
import { BANKCARD_LIST } from '../../redux/Actions'

@connect(state => ({
    loading: state.globaldata.loading,
    bankCardlist: state.fetchdata.bankCardlist
}), dispath => ({
    getBankCard(param = {}){dispath({type: BANKCARD_LIST, param})}
}))
class Mybank extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount = _ => this.props.getBankCard()

    render = _ => {
        return (
            <div>
                <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
                <Row style={{background: '#fff', paddingTop: 20}}>
                    <Row className="bank-wrapper">
                        <Spin spinning={this.props.loading}>
                            {this.props.bankCardlist.map((val, index) => 
                                <Col 
                                span={12} 
                                key={index}
                                className="bank-item">
                                    <div className="bank-cont">
                                        <div className="bank-name">
                                            <div className="bank-which">
                                                <img className="bankicon"
                                                src={require(`../../assets/img/images/${getBankType(val.bcBankCardTypeCode)}.png`)}/>
                                                <span>{val.bcBankCardTypeN}</span>
                                            </div>
                                            <div className="bank-num">
                                                <span>{`尾号${val.bankNo.substring(val.bankNo.length - 4, val.bankNo.length)}`}</span>
                                                <img className="bank-type"
                                                src={require(`../../assets/img/images/chuxucart.png`)}/>
                                            </div>
                                        </div>
                                        <div className="bank-oper">
                                            <img src={require(`../../assets/img/images/kuaijie.png`)}/>
                                        </div>
                                    </div>
                                </Col>
                            )}
                        </Spin>
                    </Row>
                </Row>
            </div>
        )
    }
}

export default Mybank