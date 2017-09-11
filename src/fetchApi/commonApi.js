export const handleTime = time => {
	let DateTime = new Date(time)
	return `${DateTime.getFullYear()}-${DateTime.getMonth() < 10 ? `0${DateTime.getMonth()}` : DateTime.getMonth()}-${DateTime.getDate() < 10 ? `0${DateTime.getDate()}` : DateTime.getDate()}`
}