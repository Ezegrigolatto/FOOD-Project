/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa a la napolitana',
};


const otherRecipe = { 
  name:"Fideos",
  resume:"sirve para acompañar a casi cualquier plato", 
  score:20,
  healthy: 15 , 
  steps:"pasos",
  diets:["vegan", "ketogenic"]
};

const otherRecipe2 = {}

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    );
  });
  describe('POST ', function(){
    it('Should return 200', function(done){
        agent.post('/recipe')
            .send(otherRecipe)
            .expect(200, done)
    });
});
});
