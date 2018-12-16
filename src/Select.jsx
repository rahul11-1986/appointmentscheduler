import React, {PureComponent} from 'react'
import styled from 'styled-components'

const DropDownList = styled.select`	
	font: 30px 'Times New Roman';
	flex: ${props => props.month ? 0.6 : 0.3};
	padding: 10px;
`

export default class Select extends PureComponent {

	render() {
		const {list, selectedValue, changeHandler, month} = this.props

		const options = list.map((item, index) => <option key={index} value={ month ? index : item.value}>{item}</option>)

		return (
			<DropDownList month={month} value={selectedValue} onChange={changeHandler}>
				{options}
			</DropDownList>
		)
	}
}