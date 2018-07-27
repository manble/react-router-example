/**
 * @description：
 * @author: manble@live.com
 * @created: 2017-12-23
 */

'use strict';
import {
    isString,
    isObject,
    isBoolean
} from 'utils/type';

const Url = {
    query: function (queryStr) {
        let query, obj = {};
        query = queryStr.substring(queryStr.indexOf('?') + 1);
        query && query.split('&').forEach(function (item) {
            if (item) {
                let kv = item.split('=');
                obj[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
            }
        });
        return obj;
    },

    val: function (name) {
        let query = window.location.search;
        return query ? decodeURIComponent((query.substring(query.indexOf('?') + 1).match(new RegExp('(?:(?:^|&)' + name + '=)([^&]*)')) || ['', ''])[1]) : '';
    },
    removeParams: function (url, name) {
        let reg = new RegExp('([\?|&])(' + name + '=[^&]*)&?', 'i');
        let newUrl = url.replace(reg, function ($1, $2) {
            return /&$/.test($1) ? $2 : '';
        });
        return newUrl;
    },

    parse: function (params, flag) {
        let arr = [],
            final = (params, flag) => {
                if (flag && isString(flag)) {
                    flag = flag.split('?');
                    flag = `${flag[0]}?${flag[1] ? flag[1] + '&' : ''}`;
                }
                isBoolean(flag) && flag && (flag = '?');
                !isString(flag) && (flag = '');
                return flag + params;
            };
        params = params || '';
        if (isObject(params)) {
            Object.keys(params).forEach((key) => {
                arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
            });
            params = arr.join('&');
        }

        return final(params, flag);
    }
};
export default Url;