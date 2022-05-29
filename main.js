if (window.localStorage.getItem("unusedSongs") == null) {
  var numbers = [0,1,2];
  window.localStorage.setItem("unusedSongs",numbers);
} else if (window.localStorage.getItem("unusedSongs") == "") {
  var numbers = [];
} else {
  var numbers = window.localStorage.getItem("unusedSongs").split(",");
};

if (window.localStorage.getItem("complete") !== null) {
  update()
}

function updateProperties(ID, number, indexOfArray) {
  if (indexOfArray) {
    document.getElementById(ID+"-img").src = images[numbers[number]];
    document.getElementById(ID+"-artist").innerHTML = artists[numbers[number]];
    document.getElementById(ID+"-title").innerHTML = titles[numbers[number]];
    document.getElementById(ID+"-audio").src = audios[numbers[number]];
  } else {
    document.getElementById(ID+"-img").src = images[number];
    document.getElementById(ID+"-artist").innerHTML = artists[number];
    document.getElementById(ID+"-title").innerHTML = titles[number];
    document.getElementById(ID+"-audio").src = audios[number];
  };
};

var currentLeft = window.localStorage.getItem("currentLeft")
if (currentLeft == null) {
  var number = Math.floor(Math.random()*numbers.length);
  updateProperties("left",number,true)
  window.localStorage.setItem("currentLeft",numbers[number]);
  numbers.splice(number,1);
  window.localStorage.setItem("unusedSongs",numbers)
} else {
  updateProperties("left",currentLeft,false)
};

if (window.localStorage.getItem("currentRight") == null) {
  var number = Math.floor(Math.random()*numbers.length);
  updateProperties("right",number,true)
  window.localStorage.setItem("currentRight",numbers[number]);
  numbers.splice(number,1);
  window.localStorage.setItem("unusedSongs",numbers)
} else {
  var currentRight = window.localStorage.getItem("currentRight")
  updateProperties("right",currentRight,false)
};

function update() {
  if (numbers.length == 0) {
    document.getElementById("left-audio").pause();
    document.getElementById("right-audio").pause();
    var winner = window.localStorage.getItem("currentLeft")
    window.localStorage.setItem("complete", true)
    updateProperties("win",winner,false)
    document.getElementById("game").style = "display: none";
    document.getElementById("game-over").style = "display: flex";
  } else {
    var number = Math.floor(Math.random()*numbers.length);
    updateProperties("right",number,true)
    window.localStorage.setItem("currentRight",numbers[number]);
    numbers.splice(number,1);
    window.localStorage.setItem("unusedSongs",numbers);
  };
};

// Do not want to make a function that takes arguments of the ID and number to set images and stuff to but I don't wanna RN

document.getElementById("right-img").ondragstart = document.getElementById("left-img").ondragstart = document.getElementById("win-img").ondragstart = () => {
  return false;
};

var left_playing = false
document.getElementById("left-img").onclick = document.getElementById("win-img").onclick = () => {
  if (!left_playing) {
    document.getElementById("right-audio").pause()
    document.getElementById("right-audio").currentTime = 0;
    document.getElementById("left-audio").play();
    left_playing = true
  } else {
    document.getElementById("left-audio").pause();
    document.getElementById("left-audio").currentTime = 0;
  };
};

document.getElementById("left-audio").onpause = () => {
  left_playing = false;
};

var right_playing = false
document.getElementById("right-img").onclick = () => {
  if (!right_playing) {
    document.getElementById("left-audio").pause();
    document.getElementById("left-audio").currentTime = 0;
    document.getElementById("right-audio").play();
    right_playing = true
  } else {
    document.getElementById("right-audio").pause();
    document.getElementById("right-audio").currentTime = 0;
  };
};

document.getElementById("right-audio").onpause = () => {
  right_playing = false;
};

document.getElementById("left-vote").onclick = () => {
  left_playing = right_playing = false;
  update();
}

document.getElementById("right-vote").onclick = () => {
  left_playing = right_playing = false;
  document.getElementById("left-img").src = document.getElementById("right-img").src;
  document.getElementById("left-artist").innerHTML = document.getElementById("right-artist").innerHTML;
  document.getElementById("left-title").innerHTML = document.getElementById("right-title").innerHTML;
  document.getElementById("left-audio").src = document.getElementById("right-audio").src;
  window.localStorage.setItem("currentLeft",window.localStorage.getItem("currentRight"));
  update()
}