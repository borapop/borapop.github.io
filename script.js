var greetingsElem = document.querySelectorAll('.greeting');
console.log(greetingsElem);

function Greetings () {
  var I = 0;
  var K = I;
  this.next = function() {
    K = I;
    if (I > greetingsElem.length - 2) {
      I = 0;
    } else {
      I++;
    }
    greetingsElem[K].style.opacity = '0';
    greetingsElem[I].style.opacity = '1';
  }
}

var greetings = new Greetings();


function changeGreeting() {
  greetings.next();
};

function run(period) {
  setTimeout(function() {
    changeGreeting();
    run(period);
  }, period);
};

run(7000);
