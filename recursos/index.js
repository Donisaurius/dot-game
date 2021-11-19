localStorage.removeItem("dot-game");

const d = document,
  $dot = d.querySelector(".dot"),
  $container = d.querySelector(".container"),
  $playBtn = d.getElementById("playBtn"),
  $points = d.getElementById("points"),
  $level = d.getElementById("level"),
  $timerText = d.querySelector(".timer > span"),
  containerAnimation = d.getElementById("animationBtn"),
  $contraRelojOptions = d.querySelector(".contraRelojOptions"),
  $contraRelojMenu = d.querySelector(".contraReloj"),
  $optionsPlus = d.querySelector(".optionsPlus"),
  $contraRelojModos = $contraRelojMenu.querySelectorAll("button");

let pointer = 0,
  level = 1,
  time = 1500,
  size = 1,
  levelCounter = 0,
  hexaChars = "0123456789abcdef",
  reduceTimeCounter = 0;

const validatePos = (dot,container) => {
  
  let dotLeftPos = dot.getBoundingClientRect().left,
  dotRightPos = dot.getBoundingClientRect().right,
  dotTopPos = dot.getBoundingClientRect().top,
  dotBottomPos = dot.getBoundingClientRect().bottom,
  limit = container.getBoundingClientRect();
  

}

const changeLocation = (dot) => {

  let dots = d.querySelectorAll(dot);

  dots.forEach(dot => {
    
    let posX = Math.round(Math.random() * 150),
    posY = Math.round(Math.random() * 150),
    random = Math.round(Math.random() * 10);

    if(random <= 2) {
      dot.style.transform = `translate(${posX}px,${posY}px)`
      /* validatePos(e.target,$container) */
    }
    if(random > 2 && random < 6){
      dot.style.transform = `translate(-${posX}px,${posY}px)`
      /* validatePos(e.target,$container) */
    }
    if(random >= 6 && random < 8){
      dot.style.transform = `translate(${posX}px,-${posY}px)`
      /* validatePos(e.target,$container) */
    }
    if(random >= 8 && random <= 10){
      dot.style.transform = `translate(-${posX}px,-${posY}px)`
      /* validatePos(e.target,$container) */
    }

  })

}
const moveInterval = () => {
  
  let interval = setInterval(() => {
    changeLocation(".dot");
    /* console.log("time",time); */
    reduceSize(".dot");

    if($playBtn.getAttribute("data-clear") === "true"){
      clearInterval(interval);
      $playBtn.setAttribute("data-clear","false");
      moveInterval();
    }

    if($playBtn.getAttribute("data-pause") === "true"){
      clearInterval(interval);
    }
  }, time);

}

const pointing = () => {
  pointer+= 100;
  reduceTimeCounter+=100;

  if(pointer === 600){
    level+=1;
    $level.textContent = `${level}`;
    $points.textContent = `${pointer}`;
    containerAnimation.children[0].textContent = "🆙";
    containerAnimation.classList.replace("none","modal")
    setTimeout(() => {
      containerAnimation.classList.replace("modal","none")
    }, 800);
    size-= 0.2;
    pointer = 0;
  }

  if(level % 3 === 0 && levelCounter < 1){
    creatPoint($dot);
    levelCounter++;
  }

  if(size < 0.4){
    levelCounter = 0;
    size = 1;
  }

  if(reduceTimeCounter % 1000 === 0){
    time-= 200;
    $playBtn.setAttribute("data-clear","true")
  }

  if(level === 10){
    alert("FELICIDADES!");
    alert("FIN DEL JUEGO")
    location.reload();
  }

  /* console.log(reduceTimeCounter) */

  $points.textContent = `${pointer}`
}

const creatPoint = (dot) => {
  let newDot = dot.cloneNode(true),
  color = "",
  index = 0;
  
  for(let cont = 0;cont<3;cont++){
    index = Math.floor(Math.random()*hexaChars.length);
    color+= hexaChars[index];
/*     console.log(hexaChars[index])
    console.log(color) */
  }

  newDot.style.background = `#${color}`;
  $container.insertAdjacentElement("beforeend",newDot)
 /*  console.log(newDot) */
}

const reduceSize = (select) => {

  dots = d.querySelectorAll(select);

  dots.forEach(dot => {
    let transform = dot.style.transform;
    dot.style.transform = `${transform} scale(${size})`;
  })
}

const timing = () => {
  let lsMinute = localStorage.getItem("dot-game") || "00";
  lsMinute = lsMinute.split(",")[0];
  //console.log(lsMinute)

  let contSeconds = 0,
  contMinutes = 0,
  textSeconds = "",
  textMinutes = lsMinute;
  
  if(localStorage.getItem("dot-game")){
    
    let time = localStorage.getItem("dot-game").split(",");
    /* console.log(time) */
    contMinutes = Number.parseInt(time[0]);
    contSeconds = Number.parseInt(time[1]);
    //console.log(contMinutes, contSeconds); 
    /*console.log(localStorage.getItem("dot-game")); */
  }

  let intervalS = setInterval(() => {
    contSeconds++;
    textSeconds = `0${contSeconds}`;
    textSeconds = textSeconds.slice(-2);
    $timerText.textContent = `${textMinutes}:${textSeconds}`
    if(contSeconds == 59 || contSeconds == "59"){
      contMinutes++;
      textMinutes = `0${contMinutes}`;
      textMinutes = textMinutes.slice(-2);
      if(contMinutes == 59 || contMinutes == "59"){
        contMinutes = -1;
        /* Reinicio el valor a -1 para que al darle la vuelta con el interval aparezca el 0 en pantalla */
      }
      contSeconds = -1;
      //console.log(contSeconds)
    }

    if($playBtn.getAttribute("data-pause") === "true"){
      clearInterval(intervalS);
    }
  }, 1000); 

}

const gameTimeRecord = () => {
  let time = $timerText.textContent,
  minutes, seconds;
  
  time = time.split(":");
  /* console.log(time) */
  minutes = time[0];
  seconds = time[1];

  if(seconds == "59"){
    Number.parseInt(minutes);
    minutes++;
    return "";
  }

  if(minutes == "59"){
    return "";
  }
  
  Number.parseInt(seconds);
  seconds++;
  time = [`${minutes}`,`${seconds}`]
  /* console.log(time) */


  localStorage.setItem("dot-game",time)
}

const animationPlay = () => {
  containerAnimation.children[0].textContent = "▶️";
  containerAnimation.classList.replace("none","modal")
  setTimeout(() => {
    containerAnimation.classList.replace("modal","none")
  }, 2500);
}

const animationPause = () => {
  containerAnimation.children[0].textContent = "⏸️";
  containerAnimation.classList.replace("none","modal")
  setTimeout(() => {
    containerAnimation.classList.replace("modal","none")
  }, 2500);
}

const moveContraRelojMenu = () => {
  //console.log("Holi")
  $contraRelojMenu.classList.toggle("moveMenu");
  $optionsPlus.classList.toggle("rotate");
  $contraRelojModos.forEach(btn => {
    btn.classList.toggle("visible");
  })
}

d.addEventListener("click",e => {
  if(e.target.matches(".dot")){
    /* console.log("Punto"); */
    if($playBtn.getAttribute("data-pause") === "true") return;

    if($timerText.textContent !== "00:00"){
      pointing()
    }

  }

  if(e.target.matches("#playBtn")){
    d.getElementById("easyMode").disabled = "true";
    d.getElementById("mediumMode").disabled = "true";
    d.getElementById("hardMode").disabled = "true";
    $playBtn.classList.add("none");
    d.getElementById("pauseBtn").classList.remove("none");
    $playBtn.setAttribute("data-pause","false");
    animationPlay();
    setTimeout(() => {
      timing();
      moveInterval();
    }, 1600);
  }
  
  if(e.target.matches("#pauseBtn")){
    d.getElementById("easyMode").removeAttribute("disabled");
    d.getElementById("mediumMode").removeAttribute("disabled");
    d.getElementById("hardMode").removeAttribute("disabled");
    $playBtn.setAttribute("data-pause","true");
    $playBtn.classList.remove("none");
    d.getElementById("pauseBtn").classList.add("none");
    animationPause();
    gameTimeRecord();
  }

  if(e.target.matches(".contraRelojOptions > *")){
    moveContraRelojMenu();
  }

  if(e.target.matches("#easyMode")){
    d.getElementById("easyMode").disabled = "true";
    d.getElementById("mediumMode").disabled = "true";
    d.getElementById("hardMode").disabled = "true";
    $playBtn.disabled = "true";
    modeTimer(e.target);
    $playBtn.setAttribute("data-pause","false");
    moveInterval();
  }
  
  if(e.target.matches("#mediumMode")){
    d.getElementById("easyMode").disabled = "true";
    d.getElementById("mediumMode").disabled = "true";
    d.getElementById("hardMode").disabled = "true";
    $playBtn.disabled = "true";
    modeTimer(e.target);
    $playBtn.setAttribute("data-pause","false");
    moveInterval();
  }
  
  if(e.target.matches("#hardMode")){
    d.getElementById("easyMode").disabled = "true";
    d.getElementById("mediumMode").disabled = "true";
    d.getElementById("hardMode").disabled = "true";
    $playBtn.disabled = "true";
    modeTimer(e.target);
    $playBtn.setAttribute("data-pause","false");
    moveInterval();
  }

})

const modeTimer = (target) => {
  if($playBtn.getAttribute("data-pause") === "false") return

  let minutes = 0,
  seconds = 0,
  textMinutes = "",
  textSeconds = "";

  if(target.id === "easyMode"){
    seconds = 60;
    minutes = 3;
  }

  if(target.id === "mediumMode"){
    seconds = 60;
    minutes = 1;
  }

  if(target.id === "hardMode"){
    seconds = 60;
    minutes = 0;
  }

  let timer = setInterval(() => {
    seconds--;
    textSeconds = `0${seconds}`.slice(-2);
    textMinutes = `0${minutes}`.slice(-2);
    //console.log(minutes,seconds);
    $timerText.textContent = `${textMinutes}:${textSeconds}`;
    
    if(seconds === 0 && minutes === 0){
      $playBtn.setAttribute("data-pause","true");
      d.querySelectorAll("button").forEach(btn => {
        btn.removeAttribute("disabled")
      })
      clearInterval(timer);
      let reboot = confirm("FIN DEL JUEGO ¿Quieres reintentarlo?");
      return reboot ? location.reload() : "";
    }

    if(seconds === 0){
      minutes--;
      seconds = 60;
    }

  }, 1000);
}


/* ⏸️
▶️
⏱️
🆙 */