const { expect } = require("chai");
const chai  = require("chai"); 
const chaiHttp = require("chai-http"); 

chai.use(chaiHttp);

const server = require("../index");

describe("Test Tyranid", () => {
    it("Should create a tyranid", (done) => {
        chai.request(server).post("/tyranid/create").send({
            name: "Hive Tyrant",
            hiveFleet: "Leviathan",
            points: 300
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res).to.haveOwnProperty("text", "Successfully created");
            return done(); 
        });
    });

    it("Should NOT create a tyranid", (done) => {
        chai.request(server).post("/tyranid/create").send().end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res).to.haveOwnProperty("text", "Tyranid validation failed: points: Path `points` is required., hiveFleet: Path `hiveFleet` is required., name: Path `name` is required.")
            return done();
        })
    })
})