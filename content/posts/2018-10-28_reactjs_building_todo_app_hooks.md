+++
date = 2018-10-28T00:00:00.000Z
title = "React.js: Building Todo App using Hooks"
image = "react-hooks-todo-app-zaiste-net.gif"
abstract = ""
[extra]
priority = 0.8
[taxonomies]
topics = [ "React.js", "JavaScript" ]
+++

React 16.7.0-alpha introduced [Hooks](https://reactjs.org/docs/hooks-intro.html), a new feature to reuse stateful logic between components. Hooks are self-contained blocks of functionality that can be easily extracted and shared, also as external dependencies. In addition, this approach doesn't require to change the component hierarchy.

I encourage you to read [the official documentation](https://reactjs.org/docs/hooks-intro.html) as well as to watch [the video introduction](https://www.youtube.com/watch?v=dpw9EHDh2bM) from React Conf 2018 before reading further.

In this article, we will build a simple Todo list using React Hooks. The code is available as [this codesanbox](https://codesandbox.io/s/pyk7ny7xo7).

## Single Task

Let's start with the component representing a single task:

::: label
./src/components/Task.js
:::

```jsx
import React, { memo } from "react";

export default memo(({ text, complete, onClick }) => (
  <li
    class="task__item"
    key={text}
    style={{
      textDecoration: complete ? "line-through" : "",
      color: complete ? "#CCC" : ""
    }}
  >
    <div class="mr-auto">{text}</div>
    <div>
      <a onClick={onClick}>
        <i
          class="fa fa-check"
          style={{
            color: complete ? "#75b51b" : ""
          }}
        />
      </a>
    </div>
  </li>
));
```

It displays a task text along with a check icon. Once the icon is clicked, the handler passed as a `onClick` prop is executed. There are also some styling changes in relation to `complete` boolean for each task: completed tasks are crossed-through and written using a lighter color.

## List of Tasks

Next, there is a list of tasks with an input field at the top add new tasks to the list.

::: label
./src/components/TaskList.js
:::

```jsx
export default () => {
  const [tasks, setTasks] = useState([]);

  const toggleComplete = i => {
    const findTask = (task, k) =>
      k === i ? { ...task, complete: !task.complete } : task;

    setTasks(tasks.map(findTask));
  };

  return (
    <div className="App">
      <TaskInput
        onSubmit={text => setTasks([{ text, complete: false }, ...tasks])}
      />

      <ul class="task__list">
        {tasks.map((task, idx) => (
          <Task {...task} onClick={() => toggleComplete(idx)} />
        ))}
      </ul>
    </div>
  );
};
```

Initially, our task list is empty as defined via `useState` hook with an empty list as its parameter. This part represents the **state** of `TaskList` component.

The component iterates over the list of tasks and renders each of them as `Task`. We also define a helper function `toggleComplete` which uses the task position within the list as the parameter to refer to each of them.

## Adding New Task

Lastly, there is `TaskInput` component defining an `onSubmit` handler that prepends a new task (with `complete` set as `false`) to the list each time there is a new entry.

::: label
./src/components/TaskInput.js
:::

```jsx
import React, { useState } from "react";

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
    resetValue: () => setValue("")
  };
};

export default ({ onSubmit }) => {
  const { resetValue, ...text } = useInputValue("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(text.value);
        resetValue();
      }}
    >
      <div class="form-group">
        <input
          type="text"
          class="form-control form-control-lg"
          id="name"
          placeholder="Read about React Hooks"
          {...text}
        />
        <small class="form-text text-muted">
          Type something in the input field above and press Enter.
        </small>
      </div>
    </form>
  );
};
```

The `TaskInput` component defines its own hook called `useInputValue` to declare the state and additional handlers for input fields.

There is a single input field in this application, so `useInputValue` is not necessary. We could've used `useState` directly. The example shows how easily hooks can be combined to build bigger blocks of abstraction that can be reused across our application.

You can play with the application using [this codesandbox](https://codesandbox.io/s/pyk7ny7xo7).
