function signUp(){
    
    var username, fullname, email, password;
    username = document.getElementById('username').value;
    fullname = document.getElementById('fullname').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    bio = document.getElementById('bio').value;
    photoprofile = document.getElementById('photoprofile').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/signUp");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "username":username,
        "email":email,
        "password":password,
        "fullname":fullname,
        "bio":bio,
        "photoprofile":photoprofile

    }));
    xmlHttp.onreadystatechange = function(){
        // debugger
        if(this.readyState == 4 && this.status == 201){
            alert('Sign Up Successfuly');
            window.location = "login.html";
        } else if (this.readyState == 4) {
            alert(this.response);
        }
    };
};

function logIn(){
    // debugger;
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/login");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "username" : username,
        "password" : password
    }));
    xmlHttp.onreadystatechange = function(){
        alert(this.response)
        if (this.readyState == 4 && this.status == 201){
            alert('Sign In Successfuly');

            localStorage.setItem('username', username);

            window.location = "index.html";
        }else if(this.readyState == 4){
            alert("Log In Failed" + this.status);
        }
    };
};

function addTweet(){
    tweet = document.getElementById('tweet-box').value;
    username = localStorage.username
    console.log(username)

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/addTweet");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringfy({
        "tweet" : tweet,
        
    }));
    xmlHttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 201){
            
            masukanTweet = JSON.parse(this.response);
            console.log(masukanTweet)
            document.getElementById('feed-box').insertAdjacentHTML("afterbegin", `<div class="tweet">
            <img src="assets/image1.jpg" alt="foto orang" />
            <h3>${masukanTweet.email}</h3>
            <p>${masukanTweet.tweet}</p>
            <span>${masukanTweet.date}</span>
            </div>`);
        }else if(this.readyState == 4){
            alert("Tweet gagal ditambahkan dengan error code: "+this.status);
        }

    };
}
