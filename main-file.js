function loginFirst(){
    if (localStorage.getItem('kode') == null){
        alert("Login First");
        document.location = "login.html";
    }
}

function signUp(){
    
    var username, fullname, email, password;
    username = document.getElementById('username').value;
    fullname = document.getElementById('fullname').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    bio = document.getElementById('bio').value;
    photoprofile = document.getElementById('photoprofile').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/signUp");
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
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/logIn");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "email" : email,
        "password" : password
    }));
    xmlHttp.onreadystatechange = function(){
        
        if (this.readyState == 4 && this.status == 201 && this.responseText != "Gagal"){
            // alert(this.response)
            data = JSON.parse(this.response)
            
            data.forEach(function (val){
                alert("Login Success")
                localStorage.setItem('kode', val.kode);
            });

            document.location = "index.html";
        }else if(this.readyState == 4){
            alert("Log In Failed" + this.status);
        }
    };
};

function addTweet(){
    // debugger;
    id = localStorage.getItem('kode');
    tweet = document.getElementById('tweet-box').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/addTweet");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "id" : id,
        "content" :tweet
    }));

    xmlHttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 201){
            alert("Tweet Success")

            document.location = "index.html";
        }else if(this.readyState == 4){
            alert("Tweet Failed" + this.status);
        }
    };
};

function readTweet() {

    user_id = localStorage.getItem('kode');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:7000/readTweet");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            jumlahTweet = 0;

            JSON.parse(this.response).forEach(function (data, index) {
                if (user_id == data.kode){

                    jumlahTweet += 1;
                    document.getElementById("angka-tweet").innerText = jumlahTweet;

                    document.getElementById("tweetfeed-section").insertAdjacentHTML("afterbegin", 
                    `<div class="tweet">
                        <img src="${data.photoprofile}" alt="foto orang" id="gambar-akun" />
                        <h4 id= "user-akun">${data.fullname}</h4>
                        <p>${data.content}</p>
                        <span>${data.date} </span>
                        <button type="button" id="delete-tweet" onclick="deleteTweet('${data.idtweet}')">X</button>
                    </div>`
                );
                }else{
                    document.getElementById("tweetfeed-section").insertAdjacentHTML("afterbegin", 
                    `<div class="tweet">
                        <img src="${data.photoprofile}" alt="foto orang" id="gambar-akun" />
                        <h4 id= "user-akun">${data.username}</h4>
                        <p>${data.content}</p>
                        <span>${data.date} </span>
                    </div>`
                    );
                }
            });
        }
    }
    xmlHttp.send();
};


function readTweetProfile() {
    id = localStorage.getItem('kode');
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/readTweetProfile");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "id" : id
    }));
    
    xmlHttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 201) {
            jumlahTweet = 0;

            JSON.parse(this.response).forEach(function (data, index) {
                    jumlahTweet += 1;
                    document.getElementById("angka-tweet").innerText = jumlahTweet;

                    document.getElementById("tweetfeed-section").insertAdjacentHTML("afterbegin", 
                    `<div class="tweet">
                        <img src="${data.photoprofile}" alt="foto orang" id="gambar-akun" />
                        <h4 id= "user-akun">${data.fullname}</h4>
                        <p>${data.content}</p>
                        <span>${data.date}</span>
                        <button type="button" id="delete-tweet" onclick="deleteTweet('${data.id}')">X</button>
                    </div>`);
                });
            }
        }
    };

function deleteTweet(idtweet){

    alert(idtweet)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/deleteTweet");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({

        'idtweet' : idtweet

    }));

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201){
            alert("tweet has been deleted" + this.status)
            document.location = "profile.html";
        }else if (this.readyState ==  4){
            alert("Method not Allowed" + this.status)
        }
    };
}

function getFollowing() {
    id = localStorage.getItem('kode');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/getFollowing");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        'id' : id
    }));
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                    document.getElementById("following").innerHTML += 
                    `<div class="follow-gambar">
                    <img src="${data.photoprofile}" alt="gambar orang" id="gambar-akun" />
                    <h5 id="following-nama">${data.fullname}</h5>
                    <small id ="follow-at">@${data.username}</small>
                    <button type="submit" id="button-follow" onclick="addFollow('${data.id}')">following</button>
                    </div>`
                });
            }
        }
    };

function addFollow(idfollowing){
    person_id = localStorage.getItem('kode');
    // alert(idfollowing)

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/addFollow");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        'id' : person_id,
        'idfollowing' : idfollowing
    }));

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201){
            alert("follow success")

            document.location = "index.html";
        }else if (this.readyState == 4){
            alert("follow failed")
        }
    };
   
};

function getProfileHome(){
    id = localStorage.getItem('kode');
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/getProfileHome");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        'id' : id
    }));

    xmlHttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                    document.getElementById('nama_profile').innerText = data.fullname
                    document.getElementById('nama_akun').innerText = '@' + data.username
                    document.getElementById('gambar_profil').src = data.photoprofile
                });
            }
        }
    };

function getHomeNavbar(){
    id = localStorage.getItem('kode');
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/getHomeNavbar");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        'id' : id
    }));

    xmlHttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                    document.getElementById('nama-navbar').innerText = '@' + data.username
                    document.getElementById('gambar-navbar').src = data.photoprofile
                    document.getElementById('gambar-navbar2').src = data.photoprofile
                });
            }
        }
    };

function editProfile(){

    id_person = localStorage.getItem('kode');

    username = document.getElementById('form-username').value;
    fullname = document.getElementById('form-fullname').value;
    email = document.getElementById('form-email').value;
    bio = document.getElementById('form-biography').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/editProfile");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "id" : id_person,
        "username":username,
        "email":email,
        "fullname":fullname,
        "bio":bio,
    }));
    xmlHttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 201){
            alert('Edit Profil Success');
            document.location = "editaccount.html";
        } else if(this.readyState == 4){
            alert(this.response);
        }
    };
};

function getDataEdit(){
    id = localStorage.getItem('kode');
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/getProfileHome");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        'id' : id
    }));

    xmlHttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                    document.getElementById('form-fullname').value = data.fullname
                    document.getElementById('form-username').value = data.username
                    document.getElementById('form-email').value = data.email
                    document.getElementById('form-biography').value = data.biography
                });
            }
        }
    };

function editPassword(){
    id_person = localStorage.getItem('kode');

    currentPass = document.getElementById('current-form-password').value;
    newPass = document.getElementById('new-form-password').value;
    verifyPass = document.getElementById('verify-form-password').value;
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:7000/editPassword");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "currpass" : currentPass,
        "newpass" : newPass,
        "verifypass" : verifyPass,
        "id" : id_person
    }));
    xmlHttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 201){
            alert('Edit Password Success');
            document.location = "editpassword.html";
        }else if(this.readyState == 4){
            alert(this.response);
        }
    };
};

function logOut(){
    localStorage.clear();
    document.location = "login.html";
}