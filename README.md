### 无关紧要的东西
来一发普通的disco！！！
http://www.bilibili.com/video/av2130097/

### 使用ES6！
ES6的特性详解：
http://es6-features.org/

### Style Guides:
非常重要！ 统一的代码风格有助于成员之间的协作和代码的维护！

### JS Style Guide 
使用ES6的风格编写，如果ES6代码能够完成的，禁止使用ES5风格。
我们使用来自Airbnb的ES6 Style Guide：
https://github.com/airbnb/javascript/tree/es6

### SCSS Style Guide
关于scss没有最好的编写方式，但我觉得这样是最适合react组建开发的
Class命名规则：第一个单字以小写字母开始；第二个单字的首字母大写，例如：firstName、lastName。
Class命名不宜过长：
  Good: left
  Bad: leftSideContainer
Class命名按功能或特性进行命名（关键是方便他人理解）
  Good: roundAvartar
  Bad: justAnotherImg
对每一个component设置一个className，利用scss的特性子元素增加于父元素下（避免独立的className污染全局css）
尽可能多使用>选择器，进行子元素的嵌套。（提升解析性能，css描述更精准，避免不必要的长classname)

只针对该component的变量，写在该component的scss目录下，
跨越多个component的变量等全局的变量，写在styles/variable.scss
不需要手动添加prefix，autoprefixer会搞定一切。

### React Style Guide
完全参考facebook官方文档
将独立的功能拆分成独立的component（便于维护、代码重用、提升性能）
学习React的好去处
https://github.com/enaqx/awesome-react


### Flux Style Guide
关于Flux的一些

Async请求放在Store里还是Action里??
看情况！（需要获取数据，放在store,需要提交数据，放在action)

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
