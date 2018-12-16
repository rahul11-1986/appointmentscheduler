import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import Slots from './data/timing'
import AddForm from './Add'
import List from './Appointment'
import Select from './Select'
import moment from 'moment'
import {Years, Days, Months} from './data/service'
import {FetchAppointments, SetDate} from './Util'

const Page = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 90vh;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 20px;
`

const Main = styled.div`
	min-width: 450px;
	border: 1px solid black;
`

const DateContainer = styled.div`
	display: flex;
	background: #333333;
	padding: 10px;
	justify-content: space-around;
	align-items: center;
`

const DateItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-transform: uppercase;
`

const Item = styled.span`
	color: ${props => props.disabled && 'grey'};
	padding : 8px ${props => props.single ? 14 : 9 }px;
	font-weight: ${props => props.header && 'bold'};
	border : ${props => props.scheduled ? '1.5px solid red' : props.clicked ? '1.5px solid black'  : '0px' };
	border-radius : ${props => props.clicked || props.scheduled ? 25 : 0}px;
	
	:hover {
		background: ${props => !props.header && 'lightblue'};
	};
`

const DateGrid = styled.div`
	display : grid;
	grid-auto-flow: row;
	grid-template-columns: repeat(7, 1fr);
	grid-auto-rows: 50px;
	margin: 0px;
	padding: 0px;
`

const Form = styled.form`
	background: #333333;
	margin: 0px;
	padding: 10px;
	color: white;

	div {
		display: grid;
		grid-template-columns: ${props => props.add ? '1fr 2fr' : '210px 190px auto'};
		grid-auto-rows: ${props => props.add ? 50: 20}px;
		grid-row-gap: 20px;
		grid-column-gap: 5px;
	}

	input {
      padding:5px;
      outline:0;
      border:1px solid rgba(0,0,0,0.1);
    }

	label {
		margin-top: 10px;
	}

	span {
		display: flex;
		cursor: pointer;
		align-items: center;
		justify-content: flex-end;
		font-size: 0.7em;
	}
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

export default class Calender extends Component {

	state = {
		year: 0,
		date: 0,
		days: 0,
		time: 1,
		month: 0,
		list : [],
		old: false,
		btnClick : false
	}

	componentDidMount() {
		let currentdate = new Date()
		
		let setState = {
			date : currentdate.getDate(), 
			month:  currentdate.getMonth(),
			year : currentdate.getFullYear()
		}

		this.fetchSchedules(setState)
	}

	fetchSchedules = (props) => {

		let { 
				date = this.state.date, 
				month = this.state.month, 
				year = this.state.year, 
				days = this.state.days
		} = props

		let currentdate = new Date()
		const selectedDate = SetDate(year, month, date)
		const old = currentdate > selectedDate

		days = new Date(year, month + 1, 0).getDate()

		const values = {
			date, month, year: parseInt(year), days, old
		}
	
		let schedules = JSON.parse(localStorage.getItem('schedules')) || []
		let schedule = FetchAppointments(values, schedules)
		
		this.setState({
					...values,
					add: false, 
					schedules, 
					list: schedule ? [...schedule] : []
		})
	}

	handleMonthChange = (e) => {			
		let setState = {
			date :  1,
			month : parseInt(e.target.value)
		}

		this.fetchSchedules(setState)
	}

	handleYearChange = (e) => {
		this.fetchSchedules({
			date :  1,
			year : e.target.value
		})
	}

	handleTimeChange = (e) => {
		this.setState({
			time : e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const {time, date, month, year} = this.state;

		const setDate = SetDate(year, month, date)
		
		let appointment = {
			id : `${time}${date}${month}${year}`,  
			date: setDate,
			reason: this.txt.add.value,
			time: Slots.find(x => x.key === time).value
		}

		let schedules = [...this.state.schedules, appointment]  
		localStorage.setItem('schedules', JSON.stringify(schedules))
		this.fetchSchedules(this.state)
		
		//reset form
		this.txt.value = ''
	}

	handleDateSelect = (e) => {
		this.fetchSchedules({date: parseInt(e.target.id) })
	}

	handleAdd = () => {
		const slots = FetchAppointments(this.state).map(x => x.id.slice(0,1)) 

		let sortedList = Slots.filter(z => !slots.includes(z.key)).sort((x,y)=> x.key > y.key ? 1 : -1)
		
		this.setState({
			add: true,
			slot: sortedList,
			time: sortedList.length > 0 ? sortedList[0].key : '1' 
		})
	}

	handleCancel = (e) => {
		let {id} = e.target
		const { schedules } = this.state;
		let list = schedules.filter(x => x.id !== id)
		localStorage.setItem('schedules', JSON.stringify(list))
		this.fetchSchedules('')
	}

	handleClose = () => {
		this.setState({
			add: false
		})
	}

	render() {

		const { add, date, time, month, year, slot, list, old } = this.state

		const DaysOfMonth = CalculateDays(this.state, this.handleDateSelect)  
				
		let selectedDate = moment(SetDate(year, month, date)).format("DD/MM/YYYY");
		
		return (
			<Page>
				<Main>
					<DateContainer>
						<Select list={Months} selectedValue={month} changeHandler={this.handleMonthChange} month={true} />
						<Select list={Years} selectedValue={year} changeHandler={this.handleYearChange} month={false} />
					</DateContainer>
					<DateGrid>
						{DaysOfMonth}
					</DateGrid>
					<Form add={add} onSubmit={this.handleSubmit}>
						{
							add ?
							( 
								<AddForm ref={x => this.txt = x} time={time} slot={slot} onChange={this.handleTimeChange} onClose={this.handleClose} />
							)
							:
							(
								<Fragment>
									<HeaderParagragh>
										<span>{selectedDate}</span>
										{!old && list.length !== Slots.length && <input type="button" value="➕" onClick={this.handleAdd} />}
									</HeaderParagragh>
									<List schedules={list} click={this.handleCancel} hideCancelButton={old}/>
								</Fragment> 
							)
						}
					</Form>
				</Main>
			</Page>
		)
	}
}

function CalculateDays(state, handleDateSelect) {
	let {date, days, month, year, schedules} = state
	
	const day = Days.map(day => <DateItem key={day}><Item disabled header>{day}</Item></DateItem>)

	let newDate = new Date()
	newDate.setFullYear(year, month, 1);

	let startMonth = 7 - newDate.getDay()
	
	const empty = startMonth && new Array(7 - startMonth).fill().map((item, index) => { return <DateItem key={index} /> })
	
	const todaysDate = new Date()

	const value = new Array(days).fill().map((item, index) => {
		let id = index + 1
		let data = {date: id, month, year} 
		let appointment = FetchAppointments(data, schedules)
		let lastDate = SetDate(year, month, id)

		return (
			<DateItem key={`item${index}`}>
				<Item disabled={todaysDate > lastDate} id={id} onClick={handleDateSelect} clicked={id === date ? true : false} single={id < 10} scheduled={appointment.length > 0}>{id}
				</Item>
			</DateItem>
		)
	})

	return [...day,...empty,...value]
}
