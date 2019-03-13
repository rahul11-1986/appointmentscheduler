import React from 'react'
import {render, cleanup, fireEvent} from 'react-testing-library'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import Calender from '../Calender'
import {Years, Days, Months} from '../data/service'

afterEach(cleanup)

test('initial calender load ', () => {

	const {container, debug, getByTestId, queryByTestId} = render(<Calender />)

	// document.querySelector('#drpMonth')
	let month = getByTestId('drpMonth')

	expect(month.length).toBe(Months.length)

	let year = getByTestId('drpYear')

	expect(year.length).toBe(Years.length)

	expect(queryByTestId('AddForm')).not.toBeInTheDocument()

	expect(getByTestId('btnAdd')).toBeInTheDocument()

	month.selectedIndex = 8

	//var d = year.selectedIndex
	//console.log('d', d);
	//month.options[month.selectedIndex].value = 0;
	//let date = getByTestId('date')

	fireEvent.change(month)

	//debug()
	})

test('open & close the add form', () => {
	
	const {container, getByTestId, getByValue, queryByTestId, debug} = render(<Calender />)
	
	let form = getByTestId('form')

	expect(form).toHaveStyle('grid-template-columns : 210px 100px auto')

	expect(queryByTestId('AddForm')).not.toBeInTheDocument()

	let button = getByValue('➕')
	
	expect(button).toHaveAttribute('type', 'button')

	fireEvent.click(button)

	expect(getByTestId('AddForm')).toBeInTheDocument()

	expect(queryByTestId('btnAdd')).not.toBeInTheDocument()
	
	expect(form).toHaveStyle('grid-template-columns : 1fr 2fr')
	
	let close = getByTestId('close')
	
	fireEvent.click(close)

	expect(queryByTestId('AddForm')).not.toBeInTheDocument()

	expect(getByValue('➕')).toBeInTheDocument()

})

test('add appointment', () => {
	const { container, debug, queryByTestId, getByTestId, getByPlaceholderText, getByValue } = render(<Calender />)
	
	let add = getByTestId('btnAdd')

	fireEvent.click(add)

	expect(getByTestId('AddForm')).toBeInTheDocument()

	let time = getByTestId('drpTime')

	time.selectedIndex = 3

	fireEvent.change(time)

	expect(time.value).toBe("4")

	let inputBox = getByPlaceholderText('Enter reason')

	inputBox.value = "Dental Appointment" 

	let button = getByValue('+ Add Item')

	expect(button).toHaveAttribute('type', 'submit')

	fireEvent.click(button)

	expect(queryByTestId('AddForm')).not.toBeInTheDocument()

	expect(getByTestId('reason')).toHaveTextContent(inputBox.value)
	
	expect(getByTestId('btnAdd')).toBeInTheDocument()
	
	fireEvent.click(getByTestId('btnAdd'))

	expect(queryByTestId('AddForm')).toBeInTheDocument()

	getByPlaceholderText('Enter reason').value = "Wedding" 

	time.selectedIndex = 1

	fireEvent.click(getByValue('+ Add Item'))

	debug()

})