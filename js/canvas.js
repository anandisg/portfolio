var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");
/*
c.fillStyle = "red";
c.fillRect(500, 100, 100, 200);
c.fillStyle = "darkgrey";
c.fillRect(700, 100, 200, 200);

c.beginPath();
c.moveTo(0, 0);
c.lineTo(100, 100);
c.lineTo(300, 200);
c.strokeStyle = "red";
c.stroke();

c.beginPath();
c.arc(500, 500, 30, 0, Math.PI * 2, false);
c.stroke();

//console.log("Hello World");*/

// for (var i = 0; i < 1000; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = getRandomColor();
//   c.stroke();
// }
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 70;
//var minRadius = 2;
window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

var colorArray = [
  "#E3DD94",
  "#D6431A",
  "#660C33",
  "#E2E642",
  "#415233",
  "#F45804",
  "#051940",
  "##020E26",
  "#0367A6",
  "#2AB0BF",
  "#E9F2EA"
];
function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.minRadius = radius;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 70 &&
      mouse.x - this.x > -70 &&
      mouse.y - this.y < 70 &&
      mouse.y - this.y > -70
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];
for (var i = 0; i < 900; i++) {
  var radius = Math.random() * 3 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = Math.random() - 0.5;
  var dy = Math.random() - 0.5;
  circleArray.push(new Circle(x, y, radius, dx, dy));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
