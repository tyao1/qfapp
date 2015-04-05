男人的开发框架，走起！

### How to Install
(vpn connection might be required)
```shell
$ npm install gulp -g
$ npm install
```

### How to Build

```shell
$ gulp build                    # or, `gulp build --release`
```

By default, it builds in debug mode. If you need to build in release mode, add
`--release` flag.

### How to Run

```shell
$ gulp                          # or, `gulp --release`
```

This will start a lightweight development server with LiveReload and
synchronized browsing across multiple devices and browsers.

### How to Deploy

```shell
$ gulp deploy                   # or, `gulp deploy --production`
```

You can deploy to different destinations by adding a corresponding flag.
For example `--production` or `--staging` etc. See the 'deploy' task in
`gulpfile.js`.

### How to Test

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```

### Async请求放在Store里还是Action里
看情况！


An alternative to doing all async ops in the action creators, which I believe someone from the FB team has mentioned, is putting async writes in the action creators and reads in the stores—with the important caveat that the stores don't update themselves asynchronously, but instead fire an action when the async request completes.

For example, a component might do:
```shell
getInitialState() {
  return { data: myStore.getSomeData(this.props.id) };
}
```
The store would have a method implemented, perhaps, something like this:
```shell
class Store {
  getSomeData(primaryKey) {
    if (!this.cache[primaryKey]) {
      MyResurceDAO.get(primaryKey).then(this.updateFromServer);
      this.cache[primaryKey] = LOADING_TOKEN;
      // LOADING_TOKEN is a unique value of some kind
      // that the component can use to know that the
      // value is not yet available.
    } else {
      return this.cache[primaryKey];
    }
  }

  updateFromServer(data) {
    fluxDispatcher.dispatch({
      type: "DATA_FROM_SERVER",
      payload: {id: primaryKey, data: data}
    });
  }

  // this handles the "DATA_FROM_SERVER" action
  handleDataFromServer(action) {
    this.cache[action.payload.id] = action.payload.data;
    this.emit("change"); // or whatever you do to re-render your app
  }
}
```
