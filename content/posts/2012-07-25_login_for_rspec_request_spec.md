
+++
date = 2012-07-25T00:00:00.000Z


title = "Login for RSpec Request Spec"
topics = [ "rspec", "ruby" ]

+++

Integration tests based on [RSpec](http://rspec.info/) request spec with
[Capybara](http://jnicklas.github.com/capybara/) are more elegant
alternative to verbose and slow [Cucumber](http://cukes.info/) tests. The only
problem I've found so far is the absence of login helper, similar to `sign_in`
method found in controller specs.

As Capybara is a library that simulates interactions with a browser, a possible
solution would be a login form submission by posting authentication credentials.
There is, however, more effective approach, i.e. setting session data directly
through [Warden](https://github.com/hassox/warden/).

Inside your RSpec request spec you have to include Warden's helpers to get
access to `login_as` method as shown below:

```
include Warden::Test::Helpers

describe YourSpec
  let(:regular) { FactoryGirl.create(:user, :regular) }

  it 'signs in' do
    login_as regular, scope: :user
    visit profile_url
    expect {
      ...
    }.to()
    ...
  end
end
```

