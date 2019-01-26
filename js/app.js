
window.addEventListener('load', async()=>{
    await authCheck()
})

async function authCheck(){
    let data = await localStorage.getItem("userauth")
    let auths = JSON.parse(data)

    // console.log(auths)
    if(auths.user !== "null"){
        document.getElementById("flo").innerHTML = "<span>"+auths.user.email+"</span>"
    }else{
        document.getElementById("mainscreen").innerHTML = "<span>"+"Please Login First"+"</span>"
        document.getElementById("flo").innerHTML = "<span>"+"No User is Logged in!"+"</span>"

        document.getElementById("header-one").style.display="none";
        document.getElementById("mydo").style.display="none";

        
    }
}

// var data_user1=firebase.database().ref().child("donors");
// data_user1.on("child_added",snap=>{
// var name1=snap.child("full-name(donor)").val();
// var address1=snap.child("address(donor)").val();
// var mobile1=snap.child("number(donor)").val();
// var grp1=snap.child("sel1(donor)").val();
// var emaill1=snap.child("useremail(donor)").val();


// $("#mydo").append("<tr><td>"+name1+"</td><td>"+address1 +"</td><td>"+mobile1+"</td><td>" +grp1 +  "</td><td>"+emaill1+"</td></tr>");
// });