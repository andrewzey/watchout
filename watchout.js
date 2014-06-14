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
var board = d3.select('.gameboard').append('svg:svg')
          .attr('width', gameOptions.width)
          .attr('height', gameOptions.height);


var Player = function(){
  this.data = {
    x: 50,
    y: 50,
    r: 10,
  };
  var self = this;
  board.selectAll('circle.player')
    .data( [this.data] )
    .enter()
    .append('circle')
    .attr('class', 'player')
    .attr('r', function(d){ return d.r; })
    .attr('cx', function (d){return axes.x(d.x);})
    .attr('cy', function (d){return axes.y(d.y);})
    .attr('fill', function(d){ return d.color; })
    .call(this.dragOn());
  //this.move(gameOptions.width/2, gameOptions.height/2);
};

Player.prototype.dragOn = function(){
  var self =  this;
  return d3.behavior.drag()
    .origin(function(d){return d;})
    .on('drag', function(){
      var X = self.data.x + d3.event.dx;
      var Y = self.data.y + d3.event.dy;
      if(0 < X && X < gameOptions.width && 0 < Y && Y < gameOptions.height){
        self.move(X, Y);
      }
    });
};
Player.prototype.move = function(x, y){
  this.data.x = x;
  this.data.y = y;
  board.selectAll('circle.player')
    .data( [this.data] )
    .attr('cx', function(d){ return d.x})
    .attr('cy', function(d){ return d.y});
};



var createEnemies = function(){
  return _.range(0, gameOptions.enemyCount).map(function(i){
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    };
  });
};


// var Enemies = function(){
//   this.data = [];
//   this.updateData();
//   this.alreadyCollided = false;
//   svg.selectAll('circle.enemy')
//     .data(this.data)
//     .enter()
//     .
// }

var render = function( enemy_data ){
  var enemies = board.selectAll('circle.enemy').data(enemy_data, function(d) { return d.id; });

  //enter new enemies
  enemies.enter().append('svg:circle')

  //Update position of existing enemies and new enemies
  enemies.attr("class", "enemy")
    .transition()
    .duration(1000)
    .attr('cx', function ( enemy ){return axes.x(enemy.x);})
    .attr('cy', function ( enemy ){return axes.y(enemy.y);})
    .attr('r', 15)


  //remove unused existing enemy DOM nodes
  enemies.exit().remove();
};

var play = function(){

  var gameTurn = function() {
    var newEnemyPositions = createEnemies();
    render(newEnemyPositions);
  };

  gameTurn();


  setInterval(gameTurn, 1000);
};
  var player = new Player();

play();



//Update Scores
var updateCurrScore = function(){
  d3.select('.current').text(gameStats.currScore.toString());
};

var updateHighScore = function(){
  if (gameStats.currScore > gameStats.highScore) {
    d3.select('.high').text(gameStats.highScore.toString());
  }
};
































// var Player = function(){
//   //this.setupDragging = __bind(this.setupDragging, this);


// };


// Player.prototype.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
// Player.prototype.fill = "#15aaff";
// Player.prototype.x = 0;
// Player.prototype.y = 0;
// Player.prototype.angle = 0;
// Player.prototype.r = 5;
// Player.prototype.gameOptions = gameOptions;
// Player.prototype.render = function( to ){
//   this.el = to.append('svg:path')
//     .attr('d', this.path)
//     .attr('fill', this.fill);
// };

// Player.prototype.getX = function( meters ){

// };
// Player.prototype.setX = function( meters ){};

// Player.prototype.getY = function( meters ){};
// Player.prototype.setY = function( meters ){};

// // fill
// // x
// // y
// // angle
// r




// <svg height="210" width="500">
//   <polygon points="100,10 40,180 190,60 10,60 160,180"
//   style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;" />
// </svg>
