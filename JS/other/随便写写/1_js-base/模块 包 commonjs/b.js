var moduleA = require('./a')

function test (){
    console.log('1-test - bbb')
}

console.log(moduleA.upper('abc-2'))
module.exports = test