function script() {
  document.getElementById("game").style = "display: flex";
  document.getElementById("game-over").style = "display: flex";
  document.getElementById("left-img").style = "outline-style: none;";
  document.getElementById("right-img").style = "outline-style: none;";
  document.getElementById("win-img").style = "outline-style: none;";
  document.getElementById("right-img").style = "outline-style: none;";
  document.getElementById("win-audio").pause();
  document.getElementById("win-audio").currentTime = 0;
  
  if (window.localStorage.getItem("unusedSongs") == null) {
    // var numbers = []; // --Used only for songs order being generated initially.
    // for (let i = 0; i < titles.length; i++) {
    //   numbers[numbers.length] = i;
    // };
    generateArray() // --Queue of songs will be generated at the start, meaning when undoing and votinmg again, the order of songs will not change.
    window.localStorage.setItem("unusedSongs",numbers);
  } else if (window.localStorage.getItem("unusedSongs") == "") {
    var numbers = [];
  } else {
    var numbers = window.localStorage.getItem("unusedSongs").split(",");
  };

  if (window.localStorage.getItem("complete") !== null) {
    update();
  };

  var votes = window.localStorage.getItem("votes")
  if (votes == null || votes == "") {
    votes = [];
  } else {
    var votes = votes.split(",");
  };

  function generateArray() { // --Queue of songs will be generated at the start, meaning when undoing and votinmg again, the order of songs will not change.
    let unused = [];
    for (let i = 0; i < titles.length; i++) {
      unused[unused.length] = i;
    };
    numbers = [];
    while (unused.length != 0) { // (If this breaks, just use <for (let i = 0; i < titles.length; i++) {>; I just wanted to use a while loop. Lots of for loops in here. -- Also while unused != [] does NOT work.)
      let index = Math.floor(Math.random()*unused.length);
      numbers[numbers.length] = unused[index];
      unused.splice(index,1);
    };
  };

  function updateProperties(ID, number, indexOfArray) {
    if (indexOfArray) {
      document.getElementById(ID+"-img").src = "Images/"+images[numbers[number]];
      document.getElementById(ID+"-artist").innerHTML = artists[numbers[number]];
      document.getElementById(ID+"-title").innerHTML = titles[numbers[number]];
      document.getElementById(ID+"-audio").src = "Songs/"+audios[numbers[number]];
    } else {
      document.getElementById(ID+"-img").src = "Images/"+images[number];
      document.getElementById(ID+"-artist").innerHTML = artists[number];
      document.getElementById(ID+"-title").innerHTML = titles[number];
      if (ID == "win") {
        document.getElementById(ID+"-audio").src = ("Songs/"+audios[number]).split(".")[0]+"-Full."+("Songs/"+audios[number]).split(".")[1];
      } else {
        document.getElementById(ID+"-audio").src = "Songs/"+audios[number];
      }
    };
  };

  var currentLeft = window.localStorage.getItem("currentLeft");
  if (currentLeft == null) {
    var number = numbers.length-1 // --Used only for songs order being generated initially.
    // var number = Math.floor(Math.random()*numbers.length); // --Song will be chosen randomly upon vote being pressed. This means undoing and reselecting could result in a different song eing selected.
    updateProperties("left",number,true)
    currentLeft = numbers[number];
    window.localStorage.setItem("currentLeft",currentLeft);
    numbers.splice(number,1);
    window.localStorage.setItem("unusedSongs",numbers)
  } else {
    updateProperties("left",currentLeft,false)
  };

  var currentRight = window.localStorage.getItem("currentRight");
  if (currentRight == null) {
    var number = numbers.length-1 // --Used only for songs order being generated initially.
    // var number = Math.floor(Math.random()*numbers.length); // --Song will be chosen randomly upon vote being pressed. This means undoing and reselecting could result in a different song eing selected.
    updateProperties("right",number,true);
    currentRight = numbers[number];
    window.localStorage.setItem("currentRight",currentRight);
    numbers.splice(number,1);
    window.localStorage.setItem("unusedSongs",numbers);
  } else {
    currentRight = window.localStorage.getItem("currentRight");
    updateProperties("right",currentRight,false);
  };

  function update() {
    document.getElementById("left-audio").pause();
    document.getElementById("left-audio").currentTime = 0;
    document.getElementById("right-audio").pause();
    document.getElementById("right-audio").currentTime = 0;
    document.getElementById("left-img").style = "outline-style: none;";
    document.getElementById("right-img").style = "outline-style: none;";
    if (numbers.length == 0) {
      document.getElementById("left-audio").pause();
      document.getElementById("right-audio").pause();
      var winner = window.localStorage.getItem("currentLeft");
      window.localStorage.setItem("complete",true);
      updateProperties("win",winner,false);
      document.getElementById("game").style = "display: none";
      document.getElementById("game-over").style = "display: flex";
    } else {
      var number = numbers.length-1 // --Used only for songs order being generated initially.
      // var number = Math.floor(Math.random()*numbers.length); // --Song will be chosen randomly upon vote being pressed. This means undoing and reselecting could result in a different song eing selected.
      updateProperties("right",number,true);
      currentRight = numbers[number];
      window.localStorage.setItem("currentRight",currentRight);
      numbers.splice(number,1);
      window.localStorage.setItem("unusedSongs",numbers);
    };
  };

  document.getElementById("right-img").ondragstart = document.getElementById("left-img").ondragstart = document.getElementById("win-img").ondragstart = document.getElementById("crown").ondragstart = () => {
    return false;
  };

  var left_playing = false
  document.getElementById("left-img").onclick = document.getElementById("win-img").onclick = () => {
    if (!left_playing) {
      document.getElementById("right-audio").pause();
      document.getElementById("right-audio").currentTime = 0;
      if (window.localStorage.getItem("complete") == null) {
        document.getElementById("left-audio").play();
        document.getElementById("left-img").style = "outline-style: double;";
      } else {
        document.getElementById("win-audio").play();
        document.getElementById("win-img").style = "outline-style: double;";
      };
    left_playing = true
    } else {
      document.getElementById("left-audio").pause();
      document.getElementById("left-audio").currentTime = 0;
      document.getElementById("win-audio").pause();
    };
  };

  document.getElementById("left-audio").onpause = document.getElementById("win-audio").onpause = () => {
    left_playing = false;
    document.getElementById("left-img").style = "outline-style: none;";
    document.getElementById("win-img").style = "outline-style: none;";
  };

  var right_playing = false
  document.getElementById("right-img").onclick = () => {
    if (!right_playing) {
      document.getElementById("left-audio").pause();
      document.getElementById("left-audio").currentTime = 0;
      document.getElementById("right-audio").play();
      document.getElementById("right-img").style = "outline-style: double;";
      right_playing = true
    } else {
      document.getElementById("right-audio").pause();
      document.getElementById("right-audio").currentTime = 0;
    };
  };

  document.getElementById("right-audio").onpause = () => {
    right_playing = false;
    document.getElementById("right-img").style = "outline-style: none;";
  };

  document.getElementById("left-vote").onclick = () => {
    votes[votes.length] = "l";
    votes[votes.length] = currentRight;
    window.localStorage.setItem("votes",votes);
    left_playing = right_playing = false;
    update();
  };

  document.getElementById("right-vote").onclick = () => {
    left_playing = right_playing = false;
    votes[votes.length] = "r";
    votes[votes.length] = currentLeft;
    window.localStorage.setItem("votes",votes);
    document.getElementById("left-img").src = document.getElementById("right-img").src;
    document.getElementById("left-artist").innerHTML = document.getElementById("right-artist").innerHTML;
    document.getElementById("left-title").innerHTML = document.getElementById("right-title").innerHTML;
    document.getElementById("left-audio").src = document.getElementById("right-audio").src;
    currentLeft = currentRight
    window.localStorage.setItem("currentLeft",currentLeft);
    update()
  };

  document.getElementById("restart-yes").onclick = () => {
    window.localStorage.clear();
    document.getElementById("restart-popup").style = "display: none;"
    script();
  };
  
  document.getElementById("restart-no").onclick = () => {
    document.getElementById("restart-popup").style = "display: none;";
  };

  document.getElementById("restart-arrow").onclick = () => {
    document.getElementById("restart-popup").style = "display: flex;";
    document.getElementById("undo-popup").style = "display: none;";
  };

  document.getElementById("undo-yes").onclick = () => {
    votes = localStorage.getItem("votes").split(",")
    if (votes[(votes.length-2)] == "l") {
      if (window.localStorage.getItem("complete") == "true") {
        window.localStorage.removeItem("complete");
        script();
      } else {
        numbers[numbers.length] = currentRight;
        // numbers.sort(sortArray); // --Used only for numerical order array
        window.localStorage.setItem("unusedSongs",numbers)
        currentRight = votes[votes.length-1]
        window.localStorage.setItem("currentRight",currentRight);
      };
    } else {
      if (window.localStorage.getItem("complete") == "true") {
        window.localStorage.removeItem("complete");
        currentLeft = votes[votes.length-1]
        window.localStorage.setItem("currentLeft",currentLeft)
      } else {
        numbers[numbers.length] = currentRight
        // numbers.sort(sortArray); // --Used only for numerical order array
        window.localStorage.setItem("unusedSongs",numbers)
        currentRight = currentLeft
        window.localStorage.setItem("currentRight",currentRight)
        currentLeft = votes[votes.length-1]
        window.localStorage.setItem("currentLeft",currentLeft)
      };
    };
    votes.splice(votes.length-2,2);
    window.localStorage.setItem("votes",votes);
    document.getElementById("undo-popup").style = "display: none;";
    script();
  };
  
  document.getElementById("undo-no").onclick = () => {
    document.getElementById("undo-popup").style = "display: none;";
  };

  document.getElementById("undo-arrow").onclick = () => {
    let votes = localStorage.getItem("votes")
    if (votes == null) {
      alert("You haven't entered anything to undo yet!");
    } else if (votes == "") {
      alert("You have reached the end of the undo history!");
    } else {
    document.getElementById("undo-popup").style = "display: flex;";
    document.getElementById("restart-popup").style = "display: none;";
    };
  };

  // function sortArray(a, b) { // --Used only for song being chosen at random upon vote selection.
  //   return a > b ? 1 : b > a ? -1 : 0;
  // };

};

script()