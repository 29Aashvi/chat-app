var firebaseConfig = {
      apiKey: "AIzaSyAKca5vGH-HBhRUfTA1R130KET1_N6M328",
      authDomain: "chat-app-32658.firebaseapp.com",
      databaseURL: "https://chat-app-32658-default-rtdb.firebaseio.com",
      projectId: "chat-app-32658",
      storageBucket: "chat-app-32658.appspot.com",
      messagingSenderId: "355563531006",
      appId: "1:355563531006:web:0b0273493e65edb4a3d3af",
      measurementId: "G-J4ZR810SWK"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");
    
      function send(){
        msg=document.getElementById("msg").value;
        firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
        });
        document.getElementById("msg").value="";
    }
    
    function getData() {firebase.database().ref("/"+room_name).on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id=childKey;
      message_data=childData;
      
      name=message_data['name'];
      message=message_data['message'];
      like=message_data['like'];
     
      name_with_tag="<h4>"+name+"</h4>";
      message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
      like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"; 
      span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span> </button> <hr>";
      row=name_with_tag+message_with_tag+like_button+span_with_tag;
      document.getElementById("output").innerHTML+=row;
    } }); }); }
    getData();
    
    function updateLike(message_id){
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes=Number(likes)+1;
    firebase.database().ref(room_name).child(message_id).update({
      like:updated_likes
    });
    }
    
    function logout(){
      localStorage.removeItem("user_name");
          localStorage.removeItem("room_name");
          window.location="login.html";
    }






    var SpeechRecognition=window.webkitSpeechRecognition;
var recognition=new SpeechRecognition();

function start(){
    document.getElementById("textbox").innerHTML="";
    recognition.start();

}

recognition.onresult=function(event){

    console.log(event);
    var content=event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML=content;
console.log(content);

if(content=="take my selfie")
{
    console.log("taking selfie in five seconds");
    speak();
}
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data="taking your selfie in 5 seconds";
    var utterthis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
    Webcam.attach(camera);
    setTimeout(function()
    {
        take_snapshot();
        save();
    },5000);
}

camera=document.getElementById("camera");
Webcam.set({
    width:360,
    height:250,
    image_format:'png',
    png_quality:90
});

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="selfie_image" src="'+data_uri+'">';
    });
}

function save(){
    var link=document.getElementById("link");
    image=document.getElementById("selfie_image").src;
    link.href=image;
    link.click();
}
