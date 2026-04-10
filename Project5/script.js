document.addEventListener("keydown", function (e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  if (e.key === "1") {
    console.log("BUTTON PRESSED");
    const x= document.getElementById('49')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  } else if (e.key === "2") {
    const x= document.getElementById('50')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  } else if (e.key === "3") {
    const x= document.getElementById('51')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  } else if (e.key === "4") {
    const x= document.getElementById('52')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  } else if (e.key === "5") {
    const x= document.getElementById('53')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  } else if (e.key === "6") {
    const x= document.getElementById('54')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  } else if (e.key === "7") {
    const x= document.getElementById('55')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  } else if (e.key === "8") {
    const x= document.getElementById('56')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  } else if (e.key === "9") {
    const x= document.getElementById('57')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000)
  } else if (e.key === "0") {
    const x= document.getElementById('48')
    x.style.background = "green";
    setTimeout(function() {
        x.style.backgroundColor = 'aquamarine';
      }, 1000);
  }
});

const buttons = document.querySelectorAll(".buttons");
console.log(buttons);
