var config = {
    apiKey: "AIzaSyDtKR96VaEz8h2U4ZWeENJIkiOrmL9pQDk",
    authDomain: "jenware-assignment.firebaseapp.com",
    databaseURL: "https://jenware-assignment.firebaseio.com",
    projectId: "jenware-assignment",
    storageBucket: "jenware-assignment.appspot.com",
    messagingSenderId: "708323791170"
  };
  firebase.initializeApp(config);

  //ACCEPTER DATA COLLECTION
  var data_user=firebase.database().ref().child("accepters");
   data_user.on("child_added",snap=>{
var name=snap.child("name").val();
var address=snap.child("address").val();
var mobile=snap.child("number").val();
var grp=snap.child("group").val();
var emaill=snap.child("useremaila").val();
var im=snap.child("img").val();

var tiem=snap.child("createTime").val();

function msToTime(tiem) {
    var milliseconds = parseInt((tiem%1000)/100)
        , seconds = parseInt((tiem/1000)%60)
        , minutes = parseInt((tiem/(1000*60))%60)
        , hours = parseInt((tiem/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if(hours>12)
    {
       return hours-6 + ":" + minutes + "pm";
   }
else{
   return hours + ":" + minutes + "am";

}

}    




var a =msToTime(tiem);

console.log(a)














$("#myb").append("<tr><td>"+name+"</td><td>"+address +"</td><td>"+mobile+"</td><td>" +grp +  "</td><td>"+
emaill+"</td><td>"+a+"</td><td>"+"<img src="+im+' alt="Profile" height="45" width="45">'+"</td></tr>" )

 });

 

  //DONOR DATA COLLECTION

 var data_user1=firebase.database().ref().child("donors");
 data_user1.on("child_added",snap=>{
 var name1=snap.child("namesignup").val();
 var address1=snap.child("addresssignup").val();
 var mobile1=snap.child("numbersignup").val();
 var grp1=snap.child("groupsignup").val();
 var emaill1=snap.child("useremaild").val();
 var tiem1=snap.child("createTime").val();
 var imm=snap.child("img").val();

 
function msToTime(tiem1) {
    var milliseconds = parseInt((tiem1%1000)/100)
        , seconds = parseInt((tiem1/1000)%60)
        , minutes = parseInt((tiem1/(1000*60))%60)
        , hours = parseInt((tiem1/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if(hours>12)
     {
        return hours-6 + ":" + minutes + "pm";
    }
else{
    return hours + ":" + minutes + "am";

}

}

var a1 =msToTime(tiem1);
 $("#mydo").append("<tr><td>"+name1+"</td><td>"+address1 +"</td><td>"+mobile1+"</td><td>" +grp1 +  "</td><td>"+emaill1+"</td><td>"+a1+"</td><td> "+
 "<img src="+imm+' alt="Profile" height="45" width="45">'+"</td></tr>" )
 });

















  //SIGN UP FORM (ACCEPTER)
  function  signup(){
    let name=document.getElementById('full-name').value;
    let address=document.getElementById('address').value;
    let number=document.getElementById('number').value;
    let group=document.getElementById('group').value;
    let useremaila=document.getElementById('useremaila').value;
    let userpwda=document.getElementById('pwda').value;
    let img = document.querySelector('#img').files[0];
    

    if(name==="" || address===""|| number==="" || group===""|| useremaila===""|| userpwda==="" ||name===" " || address===" "|| number===" " || group===" "|| useremaila===" "|| userpwda===" "){
        swal({
            text: "Fill all the fields",
            icon: "error",
            button: "ok",
        });

    }

else{
    document.getElementById("loaders").style.display = "block"
    firebase.auth().createUserWithEmailAndPassword(useremaila,userpwda)
    .then(()=>{
       let accepterinfo={
           name,
           address,
           number ,
           group,
           useremaila,
           createTime: firebase.database.ServerValue.TIMESTAMP
       }
       let accpeterId = firebase.auth().currentUser.uid;
       let storageRef = firebase.storage().ref().child(`acceptersimages/${img.name}`)
              storageRef.put(img)
           .then((snapshot) => {
               snapshot.ref.getDownloadURL().then((sanpUrl) => {
                   accepterinfo.img = sanpUrl    
       firebase.database().ref('/accepters/'+ accpeterId).set(accepterinfo)
         
         .then((success)=>{
            document.getElementById("loaders").style.display = "block";
            swal({
                title: "Welcome",
                text: "You can use this account to proceed further features",
                icon: "success",
                button: "Done",
            });
            window.location = 'signin.html'

    })
})
})
    .catch((error) => {
        document.getElementById("loaders").style.display = "none"
        swal({
            title: "Plug In",
            text: error.message,
            icon: "warning",
            button: "OK",
        });
    })

    })  
            .catch((error) => {
              // Handle Errors here.
              document.getElementById("loaders").style.display = "none"
               var errorCode = error.code;
                var errorMessage = error.message;
                swal({
                    title: "Connection Error",
                    text: errorMessage,
                    icon: "warning",
                    button: "OK",
                });
            });
    }


}


    



// LOGIN (ACCEPTER)
    function login(){
        let emaillogina=document.getElementById('email-login').value;
        let pwdlogina=document.getElementById('pwd-login').value;
        document.getElementById("loaders1").style.display = "block"
        firebase.auth().signInWithEmailAndPassword(emaillogina, pwdlogina)

        .then((success)=>{
          localStorage.setItem("userauth", JSON.stringify(success))
          document.getElementById("loaders1").style.display = "block"
          window.location = 'home(accepter).html' 
        })

    .catch(function (error) {
        document.getElementById("loaders1").style.display = "none"
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
            title: "Authentication Error",
            text: errorMessage,
            icon: "warning",
            button: "OK",
        });
        // ...
      });
      
      }
      //logout
      
      function logoutaccepter(){
      //DEFAULT FUNCTION
      firebase.auth().signOut()
      .then(function () {
          localStorage.setItem("userauth", JSON.stringify({ user: 'null' }))
          // Sign-out successful.
          window.location = "signin.html"
      }).catch(function (error) {
          // An error happened.
          var errorMessage = error.message;
          swal({
              title: "Internet Error",
              text: errorMessage,
              icon: "warning",
              button: "OK",
          });
      });
      }




      
  //SIGN UP FORM (DONOR)
  function  signupdonor(){
    let namesignup=document.getElementById('full-name(donor)').value;
    let addresssignup=document.getElementById('address(donor)').value;
    let numbersignup=document.getElementById('number(donor)').value;
    let groupsignup=document.getElementById('sel1(donor)').value;
    let useremaild=document.getElementById('useremail(donor)').value;
    let userpwdd=document.getElementById('pwd(donor)').value;
    let img = document.querySelector('#img').files[0];

    if(namesignup==="" || addresssignup===""|| numbersignup==="" || groupsignup===""|| useremaild===""|| userpwdd==="" ||namesignup===" " || addresssignup===" "|| numbersignup===" "|| groupsignup===" " || groupsignup===" "|| useremaild===" "|| userpwdd===" "){
        swal({
            text: "Fill all the fields",
            icon: "error",
            button: "ok",
        });

    }








    else{
        document.getElementById("loaders").style.display = "block"
        firebase.auth().createUserWithEmailAndPassword(useremaild,userpwdd)
        .then((success)=>{
            let donorsinfo={
                namesignup,
                addresssignup,
                numbersignup ,
                groupsignup,
                useremaild,
                createTime: firebase.database.ServerValue.TIMESTAMP
            }
            // localStorage.setItem("diff", JSON.stringify(success))
    
            let donorId = firebase.auth().currentUser.uid; 
    
            let storageRef = firebase.storage().ref().child(`donorimages/${img.name}`)
            storageRef.put(img)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((sanpUrl) => {
                        donorsinfo.img = sanpUrl
    console.log(donorsinfo)
            firebase.database().ref('/donors/'+ donorId).set(donorsinfo)
            
            .then((success) => {
                document.getElementById("loaders").style.display = "block"
                window.location = 'signindonor.html'
            })
        
           })

        })
              .catch((error) => {
                document.getElementById("loaders").style.display = "none"
                swal({
                    title: "Plug In",
                    text: error.message,
                    icon: "warning",
                    button: "OK",
                });
            })
        
            })  
        .catch((error) => {
                  // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    swal({
                        title: "Connection Error",
                        text: errorMessage,
                        icon: "warning",
                        button: "OK",
                    });
                });
        
        
        
        }

    }
    
// LOGIN (DONOR)
    function logindonor(){
        let emaillogind=document.getElementById('emaillogin').value;
        let pwdlogind=document.getElementById('pwdlogin').value;
        document.getElementById("loaders1").style.display = "block"
        firebase.auth().signInWithEmailAndPassword(emaillogind, pwdlogind)

        .then((success)=>{
          localStorage.setItem("userauth", JSON.stringify(success))
          document.getElementById("loaders1").style.display = "block"
          window.location = 'home(donor).html'
        
        
        
        })
    .catch(function (error) {
        document.getElementById("loaders1").style.display = "none"
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
            title: "Authentication Error",
            text: errorMessage,
            icon: "warning",
            button: "OK",
        });
        // ...
      });
      
      }


      //logout
      
      function logoutdonor(){
      
      firebase.auth().signOut()
      .then(function () {
          localStorage.setItem("userauth", JSON.stringify({ user: 'null' }))
          // Sign-out successful.
    document.getElementById("loaders").style.display = "block"
    window.location = "signindonor.html"
      })
      
      .catch(function (error) {
          // An error happened.
          var errorMessage = error.message;
          swal({
              title: "Internet Error",
              text: errorMessage,
              icon: "warning",
              button: "OK",
          });
      });
    }

