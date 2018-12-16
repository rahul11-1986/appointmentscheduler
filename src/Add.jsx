import React, {Fragment} from 'react'
import styled from 'styled-components'
import Time from './Time'

const Header = styled.b`
	text-align: center;
	margin: 0;
	font-size: 30px;
	flex:2;
`

const HeaderParagragh = styled.p`
	display: flex;
	margin: 0 0 20px 0;
	justify-content: space-between;

	span {
		font-size: ${props => props.add ? '0.8' : '1.2'}em;
		color: #1e94ff;
	}
`

export default class AddForm extends React.Component { 
	
	render() {

		const {time, slot, onChange, onClose} = this.props

		return (
			<Fragment>
				<HeaderParagragh add>
					<Header>Book Appointment</Header>
					<span onClick={onClose} role="img" aria-label="cancel">❌</span>
				</HeaderParagragh>
				<div>
					<label>Time</label>
					<Time t={time} slots={slot} timeChange={onChange} />
					<label>Details</label>
					<input ref={x => this.add = x } type="text" name="item" placeholder="Enter reason" required maxLength="20" />
					<input type="submit" value="+ Add Item"/>
				</div>
			</Fragment>
		)
	}
}