#### datatable说明

1.server端数据格式为:
```
{
    "status": String, //状态嘛
    "message": String, //状态信息
    "data": {
        "zip": Array, //区号信息
        total: Number, //存在所有数据的长度
        filter: Number //过滤后数据的总长度
    }
}
```

2.client端数据格式需要 **Ajax 请求结束后 callback时候** 转化成datatable支持的格式:
```
{
    draw: Number, //重绘时候需要，必须与上次不同
    recordsFiltered: Number, //过滤后数据的总长度
    recordsTotal: Number, //存在所有数据的长度
    data: Array //排序 截断后的数据
}
```

3.datatable支持格式data数据中 item的字段中必须存在aoColumns定义数组中data的字段，缺一不可

#### 数据来源说明
1.现在该数据为线上环境，如果现在本地跑数据，请先运行server文件夹下的index.js

2.替换client下index.html下的ajax路径为```http://127.0.0.1:3000/zip```