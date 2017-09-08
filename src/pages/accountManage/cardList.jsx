import React from 'react'
import { Row, Pagination } from 'antd'

const cardType = ['r', 'y', 'rO', 'yO', 'rused', 'yused']

const CardList = props => <Row>
	<Row>
		<ul className='cardList'>
			{props.list.map((val, index) => <li className='cardItem' key={index}>
				<div className='cardContainer' style={{backgroundImage: `url(${require(`../../assets/img/images/${cardType[1]}.png`)})`}}>
					<div className='cardItemLeft'>
						<p className='leftTop'>20元红包</p>
						<p className='leftBot'>有效期 2017-07-26</p>
					</div>
					<div className='cardItemRight'>
						<p className='rightTop'><span>¥</span>20</p>
						<p className='rightBot'>满100可使用</p>
					</div>
				</div>
			</li>)}
		</ul>
	</Row>
	<Row style={{display: 'flex', justifyContent: 'flex-end', padding: '15px 24px 10px'}}>
		<Pagination size="small" total={50}/>
	</Row>
</Row>

export default CardList