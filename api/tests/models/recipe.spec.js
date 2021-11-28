const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", (done) => {
        Recipe.create({ name: "Milanesa a la napolitana" })
          .then(() => done())
          .catch(() => done(new Error("It requires a valid name")));
      });
    });
    describe("score", () => {
      it("should throw an error if score is not an number", (done) => {
        Recipe.create({
          name: "Recipe",
          resume: "This is a recipe resume.",
          score: "16",
        })
          .then(() => done()
          .catch(() => done(new Error("It requires a valid score"))));
      });
      it("should work when its a valid score", (done) => {
        Recipe.create({
          name: "Recipe",
          resume: "This is a recipe resume.",
          score: 10,
        })
          .then(() => done())
          .catch(() => done(new Error("it requires a valid score")));
      });
    });
  });
});
