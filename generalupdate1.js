var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var width = 960;
var height = 500;

var svg = d3.selectAll('body').append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g')
          .attr("transform", "translate(32," + (height / 2) + ")");

var update = function(data) {
  //Data Join
  //Join new data with old elements, if any
  var text = svg.selectAll('text').data(data);

  //Update old elements
  text.attr('class', 'update');

  //Enter new elements
  text.enter().append('text')
    .attr('class', 'enter')
    .attr("x", function(d, i) { return i * 32; })
    .attr("dy", ".35em");

  //Enter & Update
  text.text(function(d) {return d});

  //Exit (remove old elements without new data)
  text.exit().remove();
};

update(alphabet);


// Grab a random sample of letters from the alphabet, in alphabetical order.
setInterval(function() {
  update(shuffle(alphabet)
      .slice(0, Math.floor(Math.random() * 26))
      .sort());
}, 1500);

// Shuffles the input array.
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
}

