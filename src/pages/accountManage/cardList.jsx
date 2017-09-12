import React from 'react'
import { Row, Pagination } from 'antd'

const cardType = ['r', 'y', 'rO', 'yO', 'rused', 'yused']

const judgeType = val => val.couponType === '1' ? val.couponStatus ? val.couponStatus === '5' ? cardType[3] : cardType[1] : cardType[5] : val.couponStatus ? val.couponStatus === '5' ? cardType[2] : cardType[0] : cardType[4]

const CardList = props => <Row>
	<Row>
		<ul className='cardList'>
			{props.list.list.map((val, index) => <li className='cardItem' key={index}>
				<div className='cardContainer' style={{backgroundImage: `url(${require(`../../assets/img/images/${judgeType(val)}.png`)})`}}>
					<div className='cardItemLeft'>
						<p className='leftTop'>{`${val.discountAmount}元${val.couponType === '1' ? '优惠券' : '红包'}`}</p>
						<p className='leftBot'>{`有效期 ${val.deadline}`}</p>
					</div>
					<div className='cardItemRight'>
						<p className='rightTop'><span>¥</span>{val.discountAmount}</p>
						<p className='rightBot'>{`满${val.fullAmount}可使用`}</p>
					</div>
				</div>
			</li>)}
		</ul>
	</Row>
	<Row style={{display: 'flex', justifyContent: 'flex-end', padding: '15px 24px 10px'}}>
		<Pagination 
        size="small" 
        defaultPageSize={4}
        onChange={(page, pageSize) => props.handlePageChange({'page': page, 'rows': pageSize})}
        total={props.list.total === '0' || !props.list.total ? 1 : props.list.total}/>
	</Row>
</Row>

export default CardList