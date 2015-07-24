/**
 * Created by ronfe on 15-7-20.
 */
var hv = {
    //video:
    url: "http://7xaw4c.com2.z0.glb.qiniucdn.com/有理数_3a_有理数的乘法异号.mp4",
    vi: [{
        time:82000,
        choices: [{
            body: 'A',
            correct: false
            //jump: Number
        },{
            body: 'B',
            correct: true,
            jump: 90000
        }]
    },{
        time:192000,
        choices: [{
            body: 'A',
            correct: true,
            jump: 200000
        },{
            body: 'B',
            correct: false
            //jump: 200000
        }]
    }],
    wi: {
        time: 230000,
        problems:[{
            body:"abc"
        }] // 参考现有题目Schema
    },
    opTime: 4000, //片头结束时间点
    finishTime: 300000, //片头和教学视频完成
    duration: 325000 // 总时长(片头+正片+片尾)
};