const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const box4 = document.getElementById('box4');
const Btn = document.getElementById('Btn');
const inputbox = document.getElementById('text');

function red(){
    box1.style.backgroundColor = "red";
}
function blue(){
    box2.style.backgroundColor = "blue";
}
function green(){
    box3.style.backgroundColor = "green";
}
function yellow(){
    box4.style.backgroundColor = "yellow";
}
function greet(){
    if (inputbox.value === ''){

    }
    else
    {
        var name = inputbox.value;
        var change = document.getElementById('greets');
        change.innerHTML = ("Hello , " + name);
    }
}

box1.addEventListener("click",red);
box2.addEventListener("click",blue);
box3.addEventListener("click",green);
box4.addEventListener("click",yellow);
Btn.addEventListener("click",greet);