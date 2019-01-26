
window.addEventListener('load', async()=>{
    await authCheck()
    // await infoCheck()

})

async function authCheck(){
    let data = await localStorage.getItem("userauth")
    let auths = JSON.parse(data)

    // console.log(auths)
    if(auths.user !== "null"){
        document.getElementById("flo").innerHTML = "<span>"+auths.user.email+"</span>"
    }else{
        document.getElementById("mainscreen2").innerHTML = "<span>"+"Please Login First"+"</span>"

        document.getElementById("header-one").style.display="none";
        document.getElementById("myb").style.display="none";
        document.getElementById("flo").innerHTML = "<span>"+"No User is Logged in!"+"</span>"

        

    }
}


// async function infoCheck(){
//     let data2 = await localStorage.getItem("diff")
//     let auths1 = JSON.parse(data2)

//     // console.log(auths)
//     if(auths1.user !== "null"){
//         document.getElementById("mainscreen2").innerHTML = "<span>"+auths1.user.namesignup+"</span>"
//     }else{
//         document.getElementById("mainscreen2").innerHTML = "<span>"+"Please Login First"+"</span>"
//         document.getElementById("show").style.display="none";

//     }
// }
