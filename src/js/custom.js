const nav = document.querySelector(".nav");
window.addEventListener("scroll", function () {
  if (this.scrollY > 0) {
    nav.classList.add("navFixed");
  } else {
    nav.classList.remove("navFixed");
  }
});

// const autoArticle = document.querySelector(".autoArticle");
// console.log(autoArticle)
const introZero = document.getElementById("intro");
const introOne = document.getElementById("intro1");
const introTwo = document.getElementById("intro2");
const introThree = document.getElementById("intro3");

const intro = document.querySelector(".intro");
const intro1 = document.querySelector(".intro1");
const intro2 = document.querySelector(".intro2");
const intro3 = document.querySelector(".intro3");

introAction(introZero, intro);
introAction(introOne, intro1);
introAction(introTwo, intro2);
introAction(introThree, intro3);

function introAction(Clc, action) {
  Clc.addEventListener("click", function () {
    action.classList.add("introOn");
    setTimeout(() => {
      action.classList.remove("introOn");
    }, 3000);
  });
}

const playZBreakWrite = document.querySelector(".playZBreakWrite"); 
playZBreakWrite.addEventListener("click", function () { 
  typingAction(breakDOM, breakWords, breakSpeed, breakWait, null);
});