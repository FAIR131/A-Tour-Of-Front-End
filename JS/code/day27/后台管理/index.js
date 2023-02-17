import route from './router.js'


window.onhashchange=HashChangeHandler;

function HashChangeHandler(){
    let hash = location.hash.slice(1)||'/';
    console.log(hash)
    const inf=route.find(item =>item.name===hash);

    if(!inf)  return

    if(inf.redirect)  return location.hash = inf.redirect;

    const res = inf.component();


    if(!res) return ;

    res.then(r=>r.default());
}