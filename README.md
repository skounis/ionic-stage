# ionic-stage
A NodeJS server for staging (deploy and demonstrate) Ionic application. The project is maintained with Heroku in mind.

## How to use
Add the `www` folder of your Ionic application under the `/apps` path. Example

* Demo app: `stage/demo/www/`

## Deploy to Heroku
First check that the [Heroku Toolbelt](https://toolbelt.heroku.com/) is properly installed in your environment.

Then be sure that your code is already committed in your local repository.

Open a terminal and type:

```
heroku create
git push heroku master
```

Now open your app by typing:

```
heroku open
```

### Hints
You may have sever local branches where different Ionic Apps are installed and staged. You could push in heroku only the local branch you need to demonstrate at a given time.

```
$ git push heroku yourbranch:master
```

See https://devcenter.heroku.com/articles/git#deploying-code

# References
## Credits
* iPhone mockup by [Pixeden](http://www.pixeden.com/psd-mock-up-templates/iphone-6-psd-vector-mockup)
