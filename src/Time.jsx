import React from 'react'
import styled from 'styled-components'

const Select = styled.select`	
	font: 25px 'Times New Roman';
	flex: ${props => props.month ? 0.6 : 0.3};
`

export default ({t, timeChange, slots}) => { 
	console.log('Time');

	const options = slots.map((time, index) => <option key={index} value={time.key}>{time.value}</option>)

	return (
		<Select value={t} onChange={timeChange}>
			{options}
		</Select>
	)
}