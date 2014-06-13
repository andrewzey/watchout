// start slingin' some d3 here.
// Game Board Dimensions and Base Rules
var gameOptions = {
  width: 960,
  height: 730,
  enemyCount: 25,
  padding: 20
};

var gameStats = {
  currScore: 0,
  highScore: 0
};

//Defines axes of game for adding, removing, and redrawing elements. *Domain is input, range is output
var axes = {
  x: d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
};

//Draw the board
var svg = d3.selectAll('.gameboard').append('svg')
          .attr('width', gameOptions.width)
          .attr('height', gameOptions.height);




// <svg height="210" width="500">
//   <polygon points="100,10 40,180 190,60 10,60 160,180"
//   style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;" />
// </svg>
