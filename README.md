# i-dna

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

## Build & development

###Requirements

node, npm: https://nodejs.org/en/ 
yeoman: http://yeoman.io/codelab/setup.html

Steps for spooling up your environment:

1. Download and install nodeJS and npm (link above)
2. Open a command shell (Applications/Utilities/Terminal)
3. Install yeoman/bower/grunt by typing the following into the shell and hitting “Enter” (note you will need your system admin password for this): sudo npm install `-—global yo bower grunt-cli`

_Yeoman:  All we want with this next step is for yeoman generate the appropriate scaffolding for the application to run in nodeJS. We’ll generate it, then drop it into the appropriate place for our application:_

Back in the shell: `yo angular`
accept default (Y) for the next 3 options you are presented with.
Make sure all angular packages are selected (using arrow keys and the space bar to select)
Hit *Enter*

When the shell has finished executing (it’ll take a minute as it’s downloading about 300MB of libraries) take the generated node_modules directory and drop it into the IMA-MVP2.Client directory.

That should be it for environment setup, now cd to the web application directory: `cd /path/to/IMA-MVP2.Client`
Then run the app: `grunt serve`

You may or may not have a browser window open automagically depending on your settings.  If not, just fire up a browser ant go to http://localhost:62890.

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
cd into /test and run Karma `karma start` for automatic updates
