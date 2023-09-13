'use strict';

const alfy = require('alfy');
const sample = require('lodash.sample');
const CryptoJS = require('crypto-js');

function truncate(q) {
    var len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}

module.exports = {
    youDaoApi: 'https://openapi.youdao.com/api',
    getParams: function () {
        var appKey = '2cbe413c9532bb1d'; // 你的应用ID
        var key = 'ihPKSuVBgJG5myv9sVLqIanGDqJz63AZ'; // 你的应用秘钥

        var salt = (new Date).getTime();
        var curtime = Math.round(new Date().getTime() / 1000);
        var str1 = appKey + truncate(alfy.input) + salt + curtime + key;
        var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

        return {
            query: {
                q: alfy.input,
                appKey,
                salt,
                from: 'zh-CHS',
                to: 'en',
                sign: sign,
                signType: "v3",
                curtime,
            }
        }
    },
    filter: {
        prep: [
            'and', 'or', 'the', 'a', 'at', 'of'
        ],
        prefix: [],
        suffix: [
            'ing', 'ed', 'ly'
        ],
        verb: [
            'was'
        ]
    }
};