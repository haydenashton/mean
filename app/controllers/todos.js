var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');


exports.create = function(req, res){
  var todo = new Todo(req.body);

  todo.creator = req.user;

  todo.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    }
    else {
      res.json(todo);
    }
  });
};


exports.list = function(req, res){
  console.log(req.user.id);
  Todo.find({'creator': req.user.id}).sort("-created")
      .populate("creator", "firstName lastName fullName")
      .exec(function(err, todos){
        if(err){
          return res.status(400).send({
            message: getErrorMessage(err)
          });
        }
        else {
          res.json(articles);
        }
      });
};


exports.read = function(req, res){
  res.json(req.todo);
};


exports.update = function(req, res){
  var todo = req.todo;

  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.complete = req.body.complete;

  todo.save(function(err){
    if(err){
      return res.status(400)
                .send({
                  message: getErrorMessage(err)
                });
    }
    else {
      res.json(article);
    }
  });
};


exports.delete = function(req, res){
  var todo = req.todo;

  todo.remove(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    }
    else {
      res.json(todo);
    }
  });
};


exports.todoById = function(req, res, next, id){
  Todo.findById(id)
      .populate('creator', 'firstName lastName fullName')
      .exec(function(err, todo){
        if(err) return next(err);
        if(!todo) return next(new Error('Failed to load todo ' + id));

        req.todo = todo;
        next();
      });
};


exports.hasAuthorization = function(req, res, next){
  if(req.todo.creator.id !== req.user.id){
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};


var getErrorMessage = function(err){
  if(err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message){
        return err.errors[errName].message;
      }
    }
  }
  else {
    return "Server error";
  }
};
