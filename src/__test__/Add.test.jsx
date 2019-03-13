import React from 'react'
import {render, cleanup, fireEvent} from 'react-testing-library'
import 'jest-styled-components'
import 'jest-dom/extend-expect'
import AddForm from '../Add'
import Slot from '../data/timing';

afterEach(cleanup)

test('load', () => {
	let onClose = jest.fn()
	let onChange = jest.fn()

	const data = {
		time: 1,
		slot : Slot,
		onClose,
		onChange
	}

	const {container, getByText, getByTestId, debug} = render(<AddForm {...data}/>)
	//debug()

	expect(getByText('Time')).toBeInTheDocument()

	fireEvent.change(getByTestId('drpTime'))
	expect(onChange).toHaveBeenCalledTimes(1)

	fireEvent.click(getByText('❌'))
	expect(onClose).toHaveBeenCalledTimes(1)

	expect(container).toMatchSnapshot()
})