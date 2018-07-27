/**
 * @description：
 * @author: manble@live.com
 * @created: 2018-07-23
 */

'use strict';

const type = (type) => (data) => type === Object.prototype.toString.call(data).slice(8, -1);

export const isObject = type('Object');
export const isFunction = type('Function');
export const isArray = type('Array');
export const isString = type('String');
export const isBoolean = type('Boolean');
export const isNull = type('Null');
export const isNumber = (num) => typeof num === 'number' && !Object.is(num, NaN);

export default {
    isObject,
    isFunction,
    isArray,
    isString,
    isBoolean,
    isNull,
    isNumber
}