const EventEmitter = require('events');

const event = new EventEmitter()

event.on('play',(data)=>{
    console.log('事件触发',data)
})

event.on('run',(data)=>{
    console.log('事件触发-r',data)
})

event.emit('run','111')