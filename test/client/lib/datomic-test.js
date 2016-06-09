import test from 'ava'
import * as datomic from 'lib/datomic'

const invoice = {
  'recipient': 'foo@bar.com',
  'notes': 'Notes',
  'dueDate': '2016-06-08T22:12:42.488Z',
  'lineItems': {
    '-1465423962524': {
      'qty': 1.5,
      'description': 'Foo',
      'cost': 10000,
    },
    '-1465423993514': {
      'qty': '',
    },
  },
  'due-date': '2016-01-01T10:59:59.999Z',
  'errors': {
    'qty': 'Must be numeric',
  },
}

test('datomic#hyphenate', t => {
  t.is(datomic.hyphenate('foo'), 'foo')
  t.is(datomic.hyphenate('fooBar'), 'foo-bar')
  t.is(datomic.hyphenate('fooBarBaz'), 'foo-bar-baz')
})

test('datomic#camelize', t => {
  t.is(datomic.camelize('foo'), 'foo')
  t.is(datomic.camelize('foo-bar'), 'fooBar')
  t.is(datomic.camelize('foo-bar-baz'), 'fooBarBaz')
})

test('datomic#toEntity', t => {
  t.deepEqual(datomic.toEntity('foo', {id: 1}), {'db/id': 1})
  t.deepEqual(datomic.toEntity('foo', {bar: 1}), {'foo/bar': 1})
  t.deepEqual(datomic.toEntity('foo', {barBaz: 1}), {'foo/bar-baz': 1})
})

test('datomic#fromEntity', t => {
  t.deepEqual(datomic.parseEntity('foo', {'db/id': 1}), {id: 1})
  t.deepEqual(datomic.parseEntity('foo', {'foo/bar': 1}), {bar: 1})
  t.deepEqual(datomic.parseEntity('foo', {'foo/bar-baz': 1}), {barBaz: 1})
})
