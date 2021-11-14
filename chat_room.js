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
    //ADD YOUR FIREBASE LINKS HERE
    
    function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
           Room_names = childKey;
          //Start code
         
    row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div> <hr> <br>";
    document.getElementById("output").innerHTML=row;
    
          //End code
          });});}
    getData();
    
    user_name=localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML="Welcome "+user_name+"!";
    
    function addRoom(){
          room_name= document.getElementById("room_name").value;
          firebase.database().ref("/").child(room_name).update({
                purpose:"Adding room name"
          });     
    
          localStorage.setItem("room_name", room_name);
          window.location="chat_page.html";
    }
    
    function redirectToRoomName(name){
    localStorage.setItem("room_name", name);
    window.location="chat_page.html";
    }
    
    function logout(){
          localStorage.removeItem("user_name");
          localStorage.removeItem("room_name");
          window.location="login.html";
    }