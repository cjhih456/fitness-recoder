

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
    const temp = new Set<string>()
    for (let i = 0; i < 29077; i++) {
      temp.add(DateUtil.numberAsDateString(i))
    }
    assert.equal(temp.size, 29077)
  })
  it('test numberAsDateString -', () => {
    assert.equal(
      DateUtil.numberAsDateString(0),
      '1999-12-31'
    )
    assert.equal(
      DateUtil.numberAsDateString(-29077),
      '1920-5-22'
    )

    const temp = new Set<string>()
    for (let i = -29077; i < 0; i++) {
      temp.add(DateUtil.numberAsDateString(i))
    }
    assert.equal(temp.size, 29077)
  })

  it('test transform', () => {
    assert.equal(
      DateUtil.numberAsDateString(DateUtil.dateStringAsNumber('1920-1-1')),
      '1920-1-1'
    )
    assert.equal(
      DateUtil.numberAsDateString(DateUtil.dateStringAsNumber('1920-12-31')),
      '1920-12-31'
    )
    assert.equal(
      DateUtil.numberAsDateString(DateUtil.dateStringAsNumber('2034-12-31')),
      '2034-12-31'
    )
    assert.equal(
      DateUtil.numberAsDateString(DateUtil.dateStringAsNumber('2034-1-1')),
      '2034-1-1'
    )
  })
})