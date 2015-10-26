expect = require('chai').expect

command = require './helpers/command'
assertStdout = require './helpers/assert_stdout'
TestApi = require './helpers/test_api'

describe 'deploy', ->
  beforeEach ->
    @api = new TestApi()
    @server = @api.start()

  afterEach ->
    @server.close()

  # TODO: test when
  # - .git doesnt exist
  # - files already added
  # - files already commited
  # - files already pushed
  # - files already deployed on closeheat
  it 'should push to GitHub and display deploy log', (done) ->
    @timeout(5000)
    @api.routes.post '/deploy/slug', (req, res) ->
      res.send slug: 'example-slug'

    @api.routes.get '/apps/example-slug/builds/for_cli', (req, res) ->
      res.send
        build:
          status: 'success'
          log: [
            {
              message: 'Testing logs.'
            }
          ]

    command('deploy').then (stdout) ->
      #TODO: fix init log (.git exists in cli repo)
      assertStdout stdout,
        """
        - Deploying the app to closeheat.com via GitHub.
        TEST: Executing 'git add .'
          All files added.
        TEST: Executing 'git commit m: true \'Quick deploy\''
          Files commited.
          Pushing to GitHub.
        TEST: Executing 'git remote '
        TEST: Executing 'git symbolic-ref --short HEAD'
        TEST: Executing 'git push origin example-branch'
          Pushed to example-branch branch on GitHub.
        TEST: Executing 'git remote --verbose'
          closeheat | Testing logs.
        Website published at http://example-slug.closeheatapp.com.
        Open it with:
          closeheat open
        """
      done()
