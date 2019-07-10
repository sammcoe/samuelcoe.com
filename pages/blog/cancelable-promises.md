---
title: Cleaning Up Promises With Pseudo-Cancellation
description: If you're writing code that causes side-effects based on the result of a Promise, and that code has the potential to no longer be executable after the promise returns, then those promises should be dealt with.
created: 2019-04-05T06:00:00.000Z
badge: JS
color: F7DF1E
---

If you're writing code that causes side-effects based on the result of a Promise, and that code has the potential to no longer be executable after the promise returns, then those promises should be dealt with.

Probably the most necessary use case for this is waiting for the result of a Promise within a React component, and setting the state of that component based on the response. If the React component un-mounts before the Promise is resolved, then the Promise will resolve and the proceeding call to `setState()` will throw a warning.

There are multiple ways that this can be dealt with:

1. Using `isMounted()` to check whether or not the component is still mounted after the Promise resolves-- which is not advisable, due to it [both deprecating and being and antipattern](https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)
2. Track the component mounted state yourself by using some sort of `_isMounted` property that is set and unset when the component mounts and un-mounts, respectively. An easy fix for the deprecating `isMounted()` function, but similarly flawed in practice.
3. Cleaning up any pending Promises by "cancelling" them to avoid any success-based code from executing. This is the advised practice and mitigates the concern of leaving code running in an environment that believes it to have stopped.

Now, here's the rub: Promises _aren't able to be canceled_.

Some libraries exist (such as [bluebird](http://bluebirdjs.com/docs/getting-started.html)), which take care of this problem for us.

It is easy; however, to quickly and efficiently deal with "cancelable" Promises ourselves. One such solution is even mentioned in the "isMounted is an Antipattern" article that I previously referenced.

I thought that this solution could be tidied up a bit, and abstracted further away from the component in question-- so I created a simple class to bundle the necessary functionality of making Promises cancelable, maintaining a pending Promises list, adding Promises, removing Promises, and clearing the list.

Here is the class:

```js
export class CancelablePromiseCollection {
  pending = [];

  add = promise => {
    let isCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        value => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
        error => reject({ isCanceled, error })
      );
    });

    const result = {
      promise: wrappedPromise,
      cancel: () => {
        isCanceled = true;
      }
    };

    this.pending = [...this.pending, result];
    return result;
  };

  remove = promise => {
    this.pending = this.pending.filter(p => p !== promise);
  };

  clear = () => this.pending.map(p => p.cancel());
}
```

To implement this in a React component, we would essentially use it like this:

```js
export class SomeClass extends Component {
  promiseCollection = new CancelablePromiseCollection();

  componentWillUnmount() {
    this.promiseCollection.clear();
  }

  doTheThing = async () => {
    const wrappedPromise = promiseCollection.add(doTheAsyncThing());
    try {
      const result = await wrappedPromise.promise();
      // Do something with 'result'
    } catch (e) {
      if (!e.isCanceled) {
        // Do something with the actual error and remove the promise from the collection
        this.promiseCollection.remove(wrappedPromise);
      }
    }
  };
}
```
