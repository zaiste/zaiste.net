
+++
date = 2012-06-08T00:00:00.000Z


title = "Asset Pipeline issue on Heroku"
topics = [ "rails", "heroku" ]

+++

On [Heroku](http://heroku.com) application's config variables are not present in
the environment during the slug compilation. Sometimes however certain variables
are needed at that stage. For example, as deployment goes through
`rake assets:precompile` step, you may need to connect to your database,
otherwise you will get an error similar to the following:

```
----->  Preparing app for Rails asset pipeline
        Running: rake assets:precompile
        rake aborted!
        could not connect to server: Connection refused
        Is the server running on host "127.0.0.1" and accepting
        TCP/IP connections on port 5432?
```

The solution is to use [Heroku Labs](https://devcenter.heroku.com/articles/labs)
feature called `user_env_compile` which puts config vars in the environment
at slug compilation stage.

It can be enabled like so:

```
heroku labs:enable user_env_compile -a myapp
```

That should resolve the problem with the `rake assets:precompile` execution.
