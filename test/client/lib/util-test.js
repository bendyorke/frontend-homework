import test from 'ava'
import * as util from 'lib/util'

test('util#isBlankLineItem', t => {
  t.truthy(util.isBlankLineItem({}))
  t.truthy(util.isBlankLineItem({qty: ''}))
  t.truthy(util.isBlankLineItem({qty: '', description: ''}))
  t.falsy(util.isBlankLineItem({id: ''}))
  t.falsy(util.isBlankLineItem({qty: 'foo'}))
})
