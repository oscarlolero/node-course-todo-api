const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done()); //limpiar la db antes de cualquier request, asuimir que se inicia con 0 todos
});

describe('POST /todos', () => {
    it('should create a new todo', done => { //done porque es async func
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {//fetch all todos, es como eld e mongoose
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch( e => done(e));
            });
    });

    it('should not create todo with invalid body data', done => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body.errors).toBeDefined();
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
            });

            done();
    });
});