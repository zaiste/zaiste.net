---
created_at: 2017-04-09
kind: article
publish: true
title: "Modern Node.js: async/await based testing with Mocha & Chai"
tags:
- javascript
- nodejs
- mocha
- chai
- async
---

Mocha is a JavaScript test framework running on Node.js and in the browser. It can run both asynchronous and synchronous code serially. Test cases are created using `describe()` and `it()`  methods, the former is used to provide a structure by allowing to put various tests cases in logical groups while the latter is where the tests are written.

In order to perform actual tests, there is a need for an assertion library:  a runtime mechanism which can be used to verify assumptions made by the program and print a diagnostic message if this assumption is false. Node.js comes with a built-in [assert library](https://nodejs.org/api/assert.html). [Chai](http://chaijs.com) is another popular assertion library that provides both the BDD and TDD styles of programming for testing the code. BDD stands for [Behavior-driven development](https://en.wikipedia.org/wiki/Behavior-driven_development) while TDD stands for [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development). In a nutshell, Chai provides a `should` keyword for BDD style which allows to chain assertions and an `expect()` method for TDD style. Choosing between one and another is a matter of personal preference.

Here's an example of BDD style using `should`:

```
chai.should();

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
tea.should.have.property('flavors').with.lengthOf(3);
```

And here's an example of TDD style using `expect`:

```
const expect = chai.expect;

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property('flavors').with.lengthOf(3);
```

Let's put all this together to test some asynchronous code using `async/await` syntax. Here we have an asynchronous `add()` function which adds two numbers. We combine Mocha with Chai's `expect` style while using ES7 `async/await` syntax.

```
const expect = require('chai').expect;

async function add(a, b) {
  return Promise.resolve(a + b);
}

describe('#add()', () => {
  it('2 + 2 is 4', async () => {
    const p = await add(2, 2)
    expect(p).to.equal(4);
  });

  it('3 + 3 is 6', async () => {
    const p = await add(3, 3)
    expect(p).to.equal(6);
  });
});
```

`async/await` syntax also makes plugins such `chai-as-promised` obsolete as we no longer need to assert facts about promises and we can only deal with values. Passing lambdas (or arrow functions) to Mocha is discouraged as it's impossible to access Mocha helper functions (lexically bound to `this`), but in practice those functions are rarely used.

In order to run let's create a new Node.js project

```
mkdir async-await-mocha-chai-example
cd async-await-mocha-chai-example
yarn init -y
```

Next, we need to install both `mocha` and `chai` as development dependencies

```
yarn add mocha chai --dev
```

Finally, let's put our test under `test/add.test.js` and run it.

```
yarn run mocha
```

```
yarn run v0.22.0

  #add()
    ✓ 2 + 2 is 4
    ✓ 3 + 3 is 6

  4 passing (199ms)

✨  Done in 0.99s.
```

For convenience, we can add a `test` command in `scripts` section of `package.json`

```
"scripts": {
  "test": "mocha --reporter list"
}
```

This way we can now run `yarn run test` and specify some default options such `--reporter` once and for all test runs. We can select which Mocha tests to run using `-g <pattern>` or `-f <substring>` options.

Mocha also provides hook methods which are used to take care of external resources (setup and teardown) either before or after all tests using `before()` and `after()` methods, or before and after each particular test with `beforeEach()` and `afterEach()`. Here's an example showing how to test database persistance.  The database connection is established once before all tests while the database is initialized from scratch before each test so they start from the same initial state.

```
const expect = require('chai').expect;
const Sequelize = require('sequelize');

describe('users', () => {
  let database;
  let User;

  before(async () => {
    database = new Sequelize('postgresql://localhost/app_test', { logging: false });
    User = database.define('user', {
      username: Sequelize.STRING,
      birthday: Sequelize.DATE
    });
  })

  beforeEach(async () => {
    await User.sync();
    await User.create({
      username: 'zaiste',
      birthday: new Date(1988, 1, 21)
    });
  })

  afterEach(async () => {
    await User.drop();
  })

  describe('#find()', () => {
    it('should find a user', async () => {
      const user = await User.findOne({ where: { username: 'zaiste' }})
      expect(user).to.be.a('object');
      expect(user).to.have.property('username');
      expect(user).to.have.property('birthday');
      expect(user.username).to.equal('zaiste');
    });
  });
});
```

Finally Mocha, prints uncaught exceptions alongside the test cases in which they were thrown, making it easy to identify exactly what failed and why.

The code for this article is located [on
GitHub](https://github.com/zaiste/async-await-mocha-chai-example).

