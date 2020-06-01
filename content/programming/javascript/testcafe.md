
+++

+++
# TestCafe (End-to-End Testing)

```bash 
npm i testcafe
```

```js 
import { Selector } from 'testcafe';

fixture `My first test`
  .page `http://github.com/`;

test('Find "testcafe" repository on GitHub', async t => {
  await t
    .typeText('form[action="/search"] input[name="q"]', 'testcafe' )
    .pressKey('enter')
    .expect(Selector('.repo-list > li > div').innerText).eql('DevExpress/testcafe');
});
```

```bash 
testcafe chrome test.js
```

-   explicit 

    ```
    undefined
    ```
-   functional testing
-   it doesn't use WebDriver
-   one-command tool
-   it allows to write tests in ESNext

