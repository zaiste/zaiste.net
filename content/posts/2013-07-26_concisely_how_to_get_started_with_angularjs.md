
+++
date = 2013-07-26T00:00:00.000Z


title = "Concisely how to get started with AngularJS"
topics = [ "AngularJS", "101" ]

+++

Today we'll dive into [AngularJS][1] realm. As usual, I'll try to explain principal concepts of that framework along with examples in the most concise way I can. Hopefully, it will help you start coding in no time.

AngularJS was created by [Miško Hevery][2] and it's maintained by Google. Its current stable version is 1.0.7. AngularJS make use of [declarative programming][4] for building UI. It extends HTML with custom elements, called directives.

For the code examples I assume that `angular.js` script is included in the `<head>`  and that the `<html>` is decorated with `ng-app` directive - this boots AngularJS.

```
<html ng-app>
    <head>
        <script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.5/angular.min.js'></script>
    </head>
    <body>
        ... Paste snippets in here ...
    </body>
</html>
```

In the following code snippets, I'll be showing only the content from inside of the `<body>`.

We have 8 concepts to cover: Model-View-ViewModel, Dependency Injection, Data Binding, Controller, Template, Service, Filter and Directive.

## Model-View-ViewModel

[Model-View-ViewModel][3] (MVVM) is an architectural pattern based on MVC and targeted at UI development. MVVM helps separate business logic (model) from the UI (view) using the view-model which adapts the data from the model so the view can easily manage them. Model is also single source of truth for the view. AngularJS uses plain JavaScript objects for the model, while `$scope` object (also a JavaScript object with additional methods to manage its state) represents ViewModel. `$scope` allows to define both the data and methods that will be available for the view.

## Dependency Injection

[Dependency Injection][5] is a software pattern which means: If an object needs another object (a dependency), this dependency is being passed to it instead of being constructed (e.g. initialised) by that object. Imagine it in the following way: you define what objects you need and they are immediately ready to work for you. It makes the application easier to develop

## Data Binding

AngularJS provides Two-Way Data Binding. It is two-way because the data can go from the model to the DOM and from the DOM to the model. In other words:
- if somethings changes in the model e.g. new blog posts being pushed by the server, it will be automatically reflected in the DOM i.e. on the view;
- if you interact with the view (e.g. mouse click) to delete a blog post, the model will be automatically notified about that change.

Such data binding is very practical as in web applications, there is often a lot of code that concerns the DOM manipulation.

Take a look at this basic 2-way data binding ([snippet][6]).

```
<input type="text" ng-model="message" placeholder='Type your message here...' />
<h1>{{message}}</h1>
```

When you start writing inside the input field, the data is sent to the model and then back to the view and displayed below the input field . In this example the model is declared through the view, right inside the HTML using `ng-model` directive, and named `message`. `$scope`, in this example, is not used directly.


## Controller

Controllers set initial state for the model, using `$scope` object, and optionally augment `$scope` with methods. The model is then available in the part of the DOM associated with that scope (data binding). A controller can be a simple JavaScript function. Controllers do not store state nor interact with remote services.

In the example below `ng-controller` associates `MyCtrl` controller with a particular `div` (a node in the DOM), which becomes this controller's scope ([snippet][7]).

```
var app = angular.module('app', []);
app.controller('MainCtrl', function($scope) {
  $scope.message = 'from MainCtrl';
});
```
```
<div ng-controller="MainCtrl">
  <h1>Output: {{message}}</h1>
</div>
```

As before, `message` is saved via `$scope` in the model and then displayed in the view using AngularJS interpolation i.e. `{{ }}`.


## Templates

Templates in AngularJS are HTML files with an extended vocabulary. This vocabulary consists of directives which show how the model should be represented on the view. AngularJS (compiler) manipulates on the DOM, and not on strings (in contrast to other JavaScript frameworks), e.g. while looking for these directives.


## Service

Services are used to manipulate data and shared it between controllers. In other words, they provide a centralised access to the data. They are [singletons][8], which means there is always only one instance of a given service.

In the example below, a service is shared between two controllers. This way each controller can access and manipulate the data that was entered in the input managed by the other controller (its scope).

```
var app = angular.module('app', []);

app.service('MessageService', function () {
    this.payload = { message: 'Hello from a Service' };
});

app.controller('FirstCtrl', function ($scope, MessageService) {
    $scope.payload = MessageService.payload;
});

app.controller('SecondCtrl', function ($scope, MessageService) {
    $scope.payload = MessageService.payload;
});
```

```
<body ng-app="app">
    <div ng-controller="FirstCtrl">
        <input type="text" ng-model="payload.message"/>
    </div>

    <div ng-controller="SecondCtrl">
        <input type="text" ng-model="payload.message"/>
    </div>
</body>
```

## Filter

Filters are helpers that adjust the data presentation on the view. For example, a builtin `number` filter helps to format numbers with decimal places ([snippet][9])

```
<input ng-model="value" type="text" placeholder='Try to enter a number with 3 or more decimal places...'/>
<h1>{{value | number:2}}</h1>
```

You can also create your own filter. Below a filter that reverses the entered text ([snippet][10]).

```
var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
    $scope.message = 'This is simple message';
});

app.filter('reverse', function() {
    return function(input, param) {
        return input.split("").reverse().join("");
    }
});
```

```
<div  ng-controller="MainCtrl">
    <h1>Orginal: {{message}}</h1>
    <h1>w/ filter: {{message | reverse }}</h1>
</div>
```

Filters can be also used when iterating over elements with `ng-repeat` directive (this directive creates a separate scope for each element of the list).

A builtin `orderBy` filter orders elements by given field ([snippet][11]).

```
var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
    $scope.books = [
        {
            title: 'Introduction to Algorithms',
            author: 'Thomas H. Cormen'
        },
        {
            title: 'The C Programming Language',
            author: 'Brian W. Kernighan'
        },
        {
            title: 'Effective Java',
            author: 'Joshua Bloch'
        },
    ];
});
```
```
<ul ng-controller="MainCtrl">
   <li ng-repeat="book in books | orderBy:'book.title'">
       <p>{{book.title}} / <em>{{book.author}}</em></p>
   </li>
</ul>
```

Another interesting iteration filter is `search`. Check how it works in [this snippet][12].


## Directive

Directives allow to extend HTML, they can be used to create custom HTML tags, or to decorate existing ones with new behaviour.

Let's create a directive that adds a copyright information using a new `<copyright>` tag ([snippet][9]).

```
var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
    $scope.message = "Hi, I'm an AngularJS app";
});

app.directive('copyright', function() {
  return {
    restrict: "E",
    replace: true,
    template: "<p>Copyright 2013</p>"
  }
});
```

```
<body ng-app="app" ng-controller="MainCtrl">
  <h3>{{ message }}</h3>
  <copyright></copyright>
</body>
```

Directives have several types. `restrict: "E"` means we should use a HTML tag to reference it, i.e. `<copyright>`; other possibilities are: `restrict: "A"` for attribute i.e. `<div copyright>`, `restrict: "C"` for class i.e. `<div class="copyright">`. `template` specify the HTML content that should be displayed when it's executed.

## Summary


[1]: http://angularjs.org/
[2]: http://misko.hevery.com/
[3]: http://en.wikipedia.org/wiki/Model_View_ViewModel
[4]: http://en.wikipedia.org/wiki/Declarative_programming
[5]: http://en.wikipedia.org/wiki/Dependency_injection
[6]: http://jsfiddle.net/zaiste/zbLJ4/
[7]: http://jsfiddle.net/zaiste/mmygB/
[8]: http://en.wikipedia.org/wiki/Singleton_pattern
[9]: http://jsfiddle.net/zaiste/FdQzW/
[10]: http://jsfiddle.net/zaiste/VvZUc/
[11]: http://jsfiddle.net/zaiste/ZsTY5/
[12]: http://jsfiddle.net/zaiste/tenk6/
[13]: http://jsfiddle.net/zaiste/zVykK/
[14]:



















