class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hithatAudio = document.querySelector(".hihat-sound");
    this.currenKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHithat = "./sounds/hihat-acoustic01.wav";
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 250;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hithatAudio.currentTime = 0;
          this.hithatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectValue = e.target.value;
    const selectName = e.target.name;
    console.log(selectValue, selectName);
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hithatAudio.src = selectValue;
        break;
      default:
        break;
    }
  }
  muteAudio(e) {
    console.log(e.target);
    e.target.classList.toggle("active");
    const muteIndex = e.target.getAttribute("data-track");
    console.log(muteIndex);
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hithatAudio.volume = 0;
          break;
        default:
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hithatAudio.volume = 1;
          break;
        default:
          break;
      }
    }
  }
  changeInput(e){
    console.log(e);
    const temponr = document.querySelector(".tempo-nr");
    temponr.innerText = e.target.value;
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if(this.playBtn.classList.contains("active")){
      this.start();
    }

  }
}

const Drums = new Drumkit();

// Drums.pads.addEventListener("click",Drums.activePad);
Drums.pads.forEach((pad) => {
  pad.addEventListener("click", Drums.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

Drums.playBtn.addEventListener("click", () => {
  // this.start();
  Drums.updateBtn();
  Drums.start();
});
Drums.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    Drums.changeSound(e);
  });
});

Drums.muteBtns.forEach((mute) => {
  mute.addEventListener("click", (e) => {
    Drums.muteAudio(e);
  });
});

Drums.tempoSlider.addEventListener("change",(e)=>{
      Drums.changeInput(e);
})