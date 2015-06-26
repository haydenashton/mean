var app = require('../../app');
var request = require('supertest')(app);
var superagent = require('superagent');
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Todo = mongoose.model('Todo');

agent = superagent.agent();
var user, todo;


describe('Todos Controller Unit Tests:', function(){
  beforeEach(function(done){
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function(){
      todo = new Todo({
        title: 'Todo title',
        description: 'Todo description',
        user: user
      });

      todo.save(function(){
        loginUser(done);
        //done();
      });
    });
  });


  describe('Testing the GET methods', function(){
    //it('login', loginUser());
    it('Should be able to get the list of todos', function(done){
      var req = request.get('/api/todos/');
      console.log(agent);
      agent.attachCookies(req);
      console.log(req);
            req.set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
              res.body.should.be.an.Array.and.have.lengthOf(1);
              res.body[0].should.have.property('title', todo.title);
              res.body[0].should.have.property('description', todo.description);

              done();
            });
    });

    it('Should be able to get the specific todo', function(done){
      var req = request.get('/api/todos/' + todo.id)
      agent.attachCookies(req);
                  req.set('Accept', 'application/json')
                  .expect('Content-Type', /json/)
                  .expect(200)
                  .end(function(err, res){
                    res.body.should.be.an.Object.and.have.property('title', todo.title);
                    res.body.should.have.property('description', todo.description);

                    done();
                  });
    });
  });


  afterEach(function(done){
    console.log("Tear down");
    Todo.remove().exec();
    User.remove().exec();

    done();
  });
});


function loginUser(done){
    var req = request.post('/signin')
          .send({username: 'username', password: 'password'})
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .end(onResponse);

    function onResponse(err, res){
      if(err) return done(err);
      //console.log(res);
      agent.saveCookies(res);
      console.log(agent);
      return done();
    }
}
