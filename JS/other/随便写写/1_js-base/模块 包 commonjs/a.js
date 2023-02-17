function test (){
    console.log('3-test - aaa')
}

function upper(str){
    return str.substring(0,1).toUpperCase()+str.substring(1)
}

function _init(){
    console.log('4-init');
}

// module.exports = {test,upper}

exports.test = test
exports.upper = upper
