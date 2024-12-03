

import { assert, describe, it } from 'vitest'

import DateUtil from './DateUtil'

describe('DateUtil test', () => {
  it('test dateStringAsNumber +', () => {
    assert.equal(
      DateUtil.dateStringAsNumber('2024-12-3'),
      9104
    )
  })
  it('test dateStringAsNumber -', () => {
    assert.equal(
      DateUtil.dateStringAsNumber('1999-12-31'),
      -1,
    )
    assert.equal(
      DateUtil.dateStringAsNumber('1920-5-22'),
      -29077,
    )
  })
  it('test numberAsDateString +', () => {
    assert.equal(
      DateUtil.numberAsDateString(9104),
      '2024-12-3'
    )
  })
  it('test numberAsDateString -', () => {
    assert.equal(
      DateUtil.numberAsDateString(-1),
      '1999-12-31'
    )
    assert.equal(
      DateUtil.numberAsDateString(-29077),
      '1920-5-22'
    )
  })
})