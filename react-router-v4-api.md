

```javascript
import {
   BrowserRouter as Router, // A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
   HashRouter, // A <Router> that uses the hash portion of the URL (i.e. window.location.hash) to keep your UI in sync with the URL.
   StaticRouter, // useful in server-side rendering.
   MemoryRouter, // useful in tests and non-browser environments like React Native.
   Route, // Its most basic responsibility is to render some UI when a location matches the route’s path.
   Link, // Provides declarative, accessible navigation around your application.
   NavLink, // A special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL.
   Switch, // Renders the first child <Route> or <Redirect> that matches the location. however, we want to pick only one <Route> to render. If we’re at /about we don’t want to also match /:user (or show our “404” page).
   Redirect, // Rendering a <Redirect> will navigate to a new location. like server-side redirects (HTTP 3xx) do.
   Prompt, // Used to prompt the user before navigating away from a page. When your application enters a state that should prevent the user from navigating away (like a form is half-filled out)
   withRouter // You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will re-render its component every time the route changes with the same props as <Route> render props: { match, location, history }.
} from 'react-router-dom';
```

#### [react-router api v4 ](https://reacttraining.com/react-router/web/api/BrowserRouter)
```
通常单页面应用路由有两种组件<BrowserRouter>和<HashRouter>，<BrowserRouter>使用HTML5 history API (pushState, replaceState, popState)来改变url。<HashRouter>用的是location的hash值 (#balabala)

<BrowserRouter>是一个容器, 像redux的Provider，里面可以放任意标签。
   basename:string，添加一个基准URL，如果你需要把对应的url部署到二级或三级目录，可以设置basename为对应的值。
   getUserConfirmation:func，导航到此页面前执行的函数，默认使用window.confirm。
   getUserConfirmation:func，当浏览器不支持HTML5的history API时强制刷新页面。
   keyLength: number，设置里面路由的location.key的长度。点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。
   children: node，渲染唯一子元素。

<Route> 是react router的主要结构单元。
<Route>有三个render method和三个props (match, location, history)。
三个render method(component：React组件。render：返回React element的函数。children ：返回React element的函数，与component和render不同，无论route是否匹配当前location，都会被渲染。)
   exact: bool 是用来做唯一匹配的，设置为true，path='/one'的路由将不能匹配'/one/two'，只能匹配'/one'。
   strict: bool 对路径末尾斜杠的匹配。设为true。path为'/one/'将不能匹配'/one'，但可以匹配 '/one/two'。
   path: string 如果不设置path路由将总是匹配。只要匹配了URL的路径名(pathname)，将通过三个render方法任意一种进行渲染。都会传入三个props (match, location, history)。

<Link>可以理解为a标签，点击会改变浏览器Url的path路径或hash值，通过Route标签来捕获这个url并渲染component属性中定义的组件。
   to: string 跳转到指定路径。
   to: object 携带参数跳转到指定路径。 to={{pathname: '/recirect-test', search: '?origin=index', hash: '#hash',state: { from: props.location }}};
   replace: 为true时，点击链接后将使用新地址（目标地址）替换当前地址。比如依次访问/one /two /three，后退的时候是 /tow /one, 如果设置跳转的/three为replace，返回的时候直接到/one。因为/two被/three替换了。

<NavLink> 用于nav导航的特殊版<Link>。
   activeClassName: string 导航选中时候的样式名，默认样式名为 active
   activeStyle: object 直接写相应的css。
   exact: bool 若为true，当访问地址严格匹配时样式才会应用。
   strict: bool 若为true，当访问地址后缀斜杠严格匹配时样式才会应用。
   isActive: func 在导航激活时候做某些事情。

<Switch> 渲染出第一个与当前访问地址匹配的<Route>或<Redirect>。

<Redirect> 重定向到一个新的地址。
   to: string The URL to redirect to.
   to: object A location to redirect to.
   push: bool 若为true，会将新地址加入到访问历史记录里面，从而使页面无法后退到上一个页面。

<Prompt> 当用户离开当前页面前做出一些提示。
   message: string
   message: func
   when: bool 设置启用Prompt的条件

history
   history 对象通常具有以下属性和方法：
   length: number 浏览历史堆栈中的条目数
   action: string 路由跳转到当前页面执行的动作，分为 PUSH, REPLACE, POP
   location: object当前访问地址信息组成的对象，具有如下属性：
      pathname: stringURL路径
      search: string URL中的查询字符串
      hash: string URL的 hash 片段
      state: string 例如执行 push(path, state) 操作时，location 的 state 将被提供到堆栈信息里，state只有在browser和memory history有效。
      push(path, [state]) 在历史堆栈信息里加入一个新条目。
      replace(path, [state]) 在历史堆栈信息里替换掉当前的条目
      go(n) 将history堆栈中的指针向前移动n。
      goBack() 等同于go(-1)
      goForward 等同于go(1)
      block(prompt) 阻止跳转
history 对象是可变的，因为建议从 <Route> 的 prop 里来获取 location，而不是从 history.location 直接获取。

match
match对象包含了<Route path>如何与URL匹配的信息。
   params: object 路径参数，通过解析URL中的动态部分获得键值对
   isExact: bool为true时，整个URL都需要匹配
   path: string 用来匹配的路径模式，用于创建嵌套的<Route>
   url: string URL匹配的部分，用于嵌套的<Link>
   可以通过以下方式获得match对象。
   Route component as this.props.match
   Route render as ({ match }) => ()
   Route children as ({ match }) => ()
   withRouter as this.props.match
   matchPath as the return value

location
location 是指你当前的位置，将要去的位置，或是之前所在的位置
可以通过以下方式获得location对象。
Route component as this.props.location
Route render as ({ location }) => ()
Route children as ({ location }) => ()
withRouter as this.props.location

withRouter包装任何自定义组件，用于获取react-router的history,location,match三个对象。
```


