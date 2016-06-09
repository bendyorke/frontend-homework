import test from 'ava'
import * as types from 'lib/types'

test('types/email', t => {
  t.truthy(types.email.validate('foo@bar.com') === false)
  t.truthy(types.email.validate('f@b.co') === false)
  t.truthy(types.email.validate('foo@b@r.com') !== false)
  t.truthy(types.email.validate('foo@bar.c') !== false)
  t.truthy(types.email.validate('fo+o@bar.com') === false)
  t.truthy(types.email.validate('fo_o@bar.com') === false)
  t.truthy(types.email.validate('foo!@bar.com') !== false)
})

test('types/date', t => {
  const date = new Date(types.date.serialize('1/1/2000'))

  t.truthy(types.date.validate('1/1/2000') === false)
  t.truthy(types.date.validate('0/1/2000') !== false)
  t.truthy(types.date.validate('1/0/2000') !== false)
  t.truthy(types.date.validate('13/1/2000') !== false)
  t.truthy(types.date.validate('1/32/2000') !== false)
  t.truthy(types.date.validate('1/1/200') !== false)
  t.truthy(date.getMonth() === 0)
  t.truthy(date.getDate() === 1)
  t.truthy(date.getFullYear() === 2000)
  t.truthy(types.date.deserialize(date) === '01/01/2000')
})
