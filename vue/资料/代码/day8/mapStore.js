var store = {
    state: {
        currentUser: { username: "zhangsan", age: 20 }
    },
    mutations:{
        abc:function(){

        }
    },
    mapState:function(arr){
        let res={}
        arr.forEach((item)=>{
            res[item]=this.state[item]
        })
        return res
    },
    mapMustations:function(arr){
        let res={}
        arr.forEach((item)=>{
            res[item]=this.mutations[item]
        })
        return res
    }
}

// console.log(store.state.currentUser.username);

// console.log(store.mapState(['currentUser']));
console.log(store.mapMustations(["abc"]));