var song1 = new Audio("prnkl.mp3");
var song2 = new Audio("prnkl.mp3");
var numbers = [0,1,2]

function update() {
  if (numbers.length == 0) {
    console.log("end")
  } else {
  var number = Math.floor(Math.random()*numbers.length);
  document.getElementById("right-img").src = images[numbers[number]];
  document.getElementById("right-artist").innerHTML = artists[numbers[number]];
  document.getElementById("right-title").innerHTML = titles[numbers[number]];
  document.getElementById("right-audio").src = audios[numbers[number]];

  numbers.splice(number,1);
  }
}

update()

document.getElementById('right-img').ondragstart = document.getElementById('left-img').ondragstart = () => {
  return false;
};

var left_playing = false
document.getElementById("left-img").onclick = () => {
  if (!left_playing) {
    document.getElementById("right-audio").pause()
    document.getElementById("right-audio").currentTime = 0;
    document.getElementById("left-audio").play();
    left_playing = true
  } else {
    document.getElementById("left-audio").pause();
    document.getElementById("left-audio").currentTime = 0;
  };
  // left_playing = !left_playing;
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
    document.getElementById("right-audio").pause()
    document.getElementById("right-audio").currentTime = 0;
  };
};

document.getElementById("right-audio").onpause = () => {
  right_playing = false;
};

