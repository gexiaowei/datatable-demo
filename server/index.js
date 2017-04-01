/**
 * index.js
 * @author Vivian
 * @version 1.0.0
 * copyright 2014-2017, gandxiaowei@gmail.com all rights reserved.
 */
const express = require('express');
const bodyParser = require('body-parser');
const zip_codes = require('./zip_code');
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.post('/zip', (req, res) => {
    let condition = req['body'];
    res.send({
        status: '0000',
        message: 'get zip code success',
        data: get_zip_codes(condition)
    });
});

app.listen(3000);

function get_zip_codes(condition) {
    let {columns, length, order, search, start} = condition;
    let {column, dir} = order[0];
    let order_column = columns[column]['data'];
    let filter_data = zip_codes.filter(item => {
        if (!search['value']) {
            return true;
        }
        let match = false;
        for (let key in item) {
            if (('' + item[key]).indexOf(search['value']) > -1) {
                match = true;
            }
        }
        return match
    });

    let sort_data = filter_data.sort((one, other) => {
        let tmp = one[order_column] > other[order_column] ? 1 : -1;
        return (dir == 'desc' ? tmp : -tmp);
    });

    start = start || 0;
    length = length || 50;
    let slice_data = sort_data.slice(start, start + length);

    return {
        total: zip_codes.length,
        filter: filter_data.length,
        zips: slice_data
    }
}


