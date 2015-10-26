fs = require 'fs'
path = require 'path'
expect = require('chai').expect
Urls = require '../src/urls'

command = require './helpers/command'
TestConfig = require './helpers/test_config'
Config = require '../src/config'
assertStdout = require './helpers/assert_stdout'

describe 'login', ->
  beforeEach ->
    TestConfig.init()
    TestConfig.rm()

  describe 'have a token', ->
    it 'blank slate', (done) ->
      command('login example-token').then (stdout) ->
        assertStdout stdout,
          """
          - Login successful. Access token saved.
          """
        expect(stdout).to.match(/Login successful. Access token saved./)
        expect(Config.fileContents()).to.eql(access_token: 'example-token')
        done()

    it 'override existing token', (done) ->
      Config.update('access_token', 'existing-token')

      command('login example-token').then (stdout) ->
        assertStdout stdout,
          """
          - Login successful. New access token saved.
          """
        expect(Config.fileContents()).to.eql(access_token: 'example-token')
        done()

  describe 'no token', ->
    it 'not logged in', (done) ->
      command('login').then (stdout) ->
        assertStdout stdout,
          """
          - Log in at http://app.closeheat.com/api/login in your browser.
          """
        done()

    it 'logged in already', (done) ->
      Config.update('access_token', 'existing-token')

      command('login').then (stdout) ->
        assertStdout stdout,
          """
          - You are already logged in.
            Log in with another account here: http://app.closeheat.com/api/login
          """
        done()
