'use strict'

exports.email = {
  validate: value => {
    return !/^[\w+]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(value) && 'Invalid email'
  },
}

exports.date = {
  validate: value => {
    const [month, day, year] = value.split('/').map(x => parseInt(x))
    if (isNaN(day)   || day > 31   || day < 1   ||
        isNaN(month) || month > 12 || month < 1 ||
        isNaN(year)  || String(year).length !== 4) return 'Date must be in M/D/YYYY format'
    return false
  },
  serialize: value => {
    const [month, day, year] = value.split('/')
    let date = new Date()
    date = new Date(date).setMonth(parseInt(month) - 1)
    date = new Date(date).setDate(day)
    date = new Date(date).setFullYear(year)
    date = new Date(date).setHours(11)
    date = new Date(date).setMinutes(59)
    date = new Date(date).setSeconds(59)
    date = new Date(date).setMilliseconds(999)
    return new Date(date).toISOString()
  },
  deserialize: value => {
    const date = new Date(value)
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()]
      .map(x => x < 10 ? '0' + x : String(x))
      .join('/')
  },
}

exports.number = {
  validate: value => {
    return (isNaN(value) || !String(value).length) && 'Must be numeric'
  },
  serialize: value => parseFloat(value),
  deserialize: value => value.toFixed(2),
}

exports.cents = {
  validate: value => {
    return (isNaN(value) || !String(value).length) && 'Must be numeric'
  },
  serialize: value => {
    return Math.round(parseFloat(value) * 100)
  },
  deserialize: value => {
    return (value / 100).toFixed(2)
  },
}
