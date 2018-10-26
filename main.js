function signUp(){
    // debugger;
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    fullName = document.getElementById('fullName').value;
    password = document.getElementById('password').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/signUp");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "username":name,
        "email":email,
        "password":password,
        "fullname":fullName
    }));
    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 201){
            alert('Sign Up Successfuly');
            window.location = "/login.html";
        } else if (this.readyState == 4) {
            alert(this.response);
        }


    };
};

function logIn(){
    debugger;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/logIn");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "email" : email,
        "password" : password
    }));
    xmlHttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 201){
            alert('Sign Up Successfuly');
            window.location = "/index.html";
        }else if(this.readyState == 4){
            alert(this.reespone);
        }
    }
}