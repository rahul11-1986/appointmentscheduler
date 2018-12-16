const FetchAppointments = (props, list=[]) => {
	const {date, month, year, schedules=[] } = props	
	let data = list.length > 0 ? list : schedules
	let value = `${date}${month}${year}`
	
	return data.filter(x => {
			let time = x.id
			return x.id.slice(1, time.length) === value
	}).sort((x,y) => x.id > y.id ? 1 : -1)
}

const SetDate = (year, month, day) => {
	let date = new Date()
	date.setFullYear(year, month, day)  
	return date 
}

export {FetchAppointments, SetDate}