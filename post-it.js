$(document).ready(function() {

  var Board = function() {
    this.postCount = 0;
  }

  Board.prototype.initialize = function() {
    $('#board').on('click', this.createPostIt);
  }

  Board.prototype.createPostIt = function(clickEvent){
    board.postCount += 1;
    postIt = new PostIt(board.postCount, clickEvent.offsetX, clickEvent.offsetY)
    postIt.initialize()
  }


  var PostIt = function(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  PostIt.prototype.initialize = function () {
    postIt.appendToBoard()
    postIt.allowContentEdit()
    postIt.makeDraggable()
    postIt.enableDeletePostIt()
  }

  PostIt.prototype.appendToBoard = function() {
    $('#board').append("<div contenteditable='true' id='" + this.id + "' class='post-it'> <button value='" + this.id + "'> X </button> <h3 class='header'>Your Post-It</h3><p class='content'>{Content Here}</p></div>")
    $('#' + this.id).css({'top': this.y, 'left': this.x})
  }

  PostIt.prototype.enableDeletePostIt = function() {
    $('button').on('click', function(e){
      e.stopPropagation()
      var post_id = e.currentTarget.value
      $('#'+ post_id).remove()
    })
  }

  PostIt.prototype.makeDraggable = function() {
    var post_it = $('#' + this.id)
    post_it.on('mouseover', function() {
      post_it.draggable({handle: ".header"})
    })
    post_it.on('dblclick', function() {
      post_it.draggable("destroy");
    })
  }

  PostIt.prototype.allowContentEdit = function() {

    $('#' + this.id).on('click', function(e) {
      e.stopPropagation()
    })
  }

  board = new Board
  board.initialize()
})