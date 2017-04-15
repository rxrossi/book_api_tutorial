import supertest from 'supertest';
import chai from 'chai';
import Joi from 'joi';
import JoiAssert from 'joi-assert';
import setupApp from '../../src/app.js';

global.setupApp = setupApp;
global.supertest = supertest;
global.request = supertest;
global.expect = chai.expect;
global.Joi = Joi;
global.JoiAssert = JoiAssert;
