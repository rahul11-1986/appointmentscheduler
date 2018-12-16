import React, {Fragment} from 'react'
import styled from 'styled-components'

const Paragraph = styled.p`
	margin: 0px;
	padding: 0px;
	grid-column: 1/3;
`

const ParagraphList = styled.p`
	display: flex;
	align-items: center;
	justify-content: ${props => props.time ? 'flex-end' : 'flex-start'};
	margin: 0px;
	padding: 0px;
	color: ${props => props.time && '#8f8f8f'};
	font-size: ${props => !props.time && '1.1'}em;
`

export default ({schedules, click, hideCancelButton}) => {
	console.log('List');

	const list = schedules.map((schedule,index) => { 
		return (
			<Fragment key={index}>
				<ParagraphList>{schedule.reason}</ParagraphList>
				<ParagraphList time>{schedule.time}</ParagraphList>
				{!hideCancelButton ? <span id={schedule.id} onClick={click} role="img" aria-label="cancel">❌</span> : <span/>}
			</Fragment>
		)
	})

	return (
		<div>
			{list.length > 0 ? list : <Paragraph>You've no upcoming appointment(s).</Paragraph>}
		</div>
	)
}