"use strict";

process.env.NODE_ENV = 'test';

// setup for tests
let chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

let expect = chai.expect;
chai.use(sinonChai);

let clock = sinon.useFakeTimers();

// load the robot, in test mode
let Cylon = require('cylon');

Cylon.config({ testMode: true })

require('../../pi/app.js');

describe("TestBot", function() {
  let robot = Cylon.MCP.robots['smoke-pi'];

  it("should have work", function() {
    expect(robot.work).to.be.a('function');
  });
});
