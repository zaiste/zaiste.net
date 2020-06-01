
+++
date = 2012-05-07T00:00:00.000Z


title = "Deployment Status on HipChat for Rails Apps"
topics = [ "rails", "hipchat" ]

+++

[HipChat](http://hipchat.com) is a great product, it is probably the most important tool at [Nukomeet](http://nukomeet.com). It works as a kind of information hub that centralizes our communication.

We really like HipChat integrations, they provide an easy way to interact with 3rd party services.  For example, we set up [Heroku](http://heroku.com) and [Capistrano](https://github.com/capistrano/capistrano/wiki/Documentation-v2.x) so the team gets notifications about deployment of our Rails applications. These integrations are extremely easy to set up.

Hipchat w/ Heroku
-----------------

HipChat integrations with Heroku is about executing one line from the command line:

    heroku addons:add deployhooks:http \
        --url="https://api.hipchat.com/v1/webhooks/heroku?auth_token=<token>&room_id=<room_id>"

Token is accessible from

https://`<your organization>`.hipchat.com/admin/api

Room IDs can be viewed via

https://`<your organization>`.hipchat.com/rooms/ids

HipChat w/ Capistrano
---------------------

Capistrano Integration with HipChat requires a bit more work, but it is still quite easy. You start by adding [mojotech/hipchat](https://github.com/mojotech/hipchat) gem to your `Gemfile`, followed by `bundle install`. Next step is to add `require 'hipchat/capistrano'` to `config/deploy.rb` along with some settings:

    set :hipchat_token, "<your token>"
    set :hipchat_room_name, "Your room"
    set :hipchat_announce, false # notify users

And that’s all. Enjoy your HipChat integration with Heroku or Capistrano.
