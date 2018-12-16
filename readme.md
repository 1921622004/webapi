# 你（可能）不知道的webapi

### 简介
作为前端er，我们的工作与web是分不开的，随着HTML5的日益壮大，浏览器自带的webapi也随着增多。本篇文章主要选取了几个有趣且有用的webapi进行介绍，分别介绍其用法、用处以及浏览器支持度，同时我也分别为这几个api都做了一个简单的[demo](https://github.com/1921622004/webapi)（真的很简单，样式等于没有~）这几个api分别是：
 - page lifecycle
 - onlineState
 - 利用deviceOrientation制作一个随着手机旋转的正方体
 - battery status
 - custom event
 - 利用execCommand完成一个简单的富文本

### page lifecycle(网页生命周期)

#### 介绍
我们可以用document.visibitilityState来监听网页可见度，是否卸载，但是在手机和电脑上都会现这种情况，就是比如说页面打开过了很久没有打开，这时你看在浏览器的tab页中看着是可以看到内容的，但是点进去却需要加载。chrome68添加了 **freeze**和 **resume**事件，来完善的描述一个网页从加载到卸载，包括浏览器停止后台进程，释放资源各种生命阶段。从一个生命周期阶段到另外一个生命周期阶段会触发不同的事件，比如onfocus，onblur，onvisibilitychange，onfreeze等等，通过这些事件我们可以相应网页状态的转换。具体的教程推荐大家看看[阮一峰大神的教程](http://www.ruanyifeng.com/blog/2018/11/page_lifecycle_api.html)。

#### 用法

```javascript
window.addEventListener('blur',() => {})
window.addEventListener('visibilitychange',() => {
    // 通过这个方法来获取当前标签页在浏览器中的激活状态。
    switch(document.visibilityState){
        case'prerender': // 网页预渲染 但内容不可见
        case'hidden':    // 内容不可见 处于后台状态，最小化，或者锁屏状态
        case'visible':   // 内容可见
        case'unloaded':  // 文档被卸载
    }
});
```

#### 用处
大家可以看下这个demo

所以说，这个API的用处就是用来相应我们网页的状态，比如说我们的页面是在播放视频或者是一个网页的游戏，你可以通过这个API来去做出对应的相应，暂停视频，游戏暂停等等。

#### 浏览器支持度
page visibilituState 


### online state（网络状态）
这个API就很简单了，就是获取当前的网络状态，同时也有对应的事件去相应网络状态的变化。

#### 用法
```javascript
window.addEventListener('online',onlineHandler)
window.addEventListener('offline',offlineHandler)
```

#### 用处
比如说我们的网站是视频网站，正在播放的时候，网络中断了，我们可以通过这个API去相应，给用户相应的提示等等。

#### 浏览器支持度


###  Vibration（震动）
让手机震动~~~  嗯，就这么简单。

#### 用法
```javascript
// 可以传入一个大于0的数字，表示让手机震动相应的时间长度，单位为ms
navigator.vibrate(100)
// 也可以传入一个包含数字的数组，比如下面这样就是代表震动300ms，暂停200ms，震动100ms，暂停400ms，震动100ms
navigator.vibrate([300,200,100,400,100])
// 也可以传入0或者一个全是0的数组，表示暂停震动
navigator.vibrate(0)
```

#### 用处
用来给用户一个提示，比如说数据校验失败，当然震动不止这点作用，大家自己去扩展吧~~~

#### 浏览器支持度

### device orientation（陀螺仪）
通过绑定事件来获取设备的物理朝向，可以获取到三个数值，分别是：
- alpha：设备沿着Z轴的旋转角度

- beta：设备沿着X轴的旋转角度

- gamma：设备沿着Y轴的旋转角度

#### 用法
```javascript
window.addEventListener('deviceorientation',e => {
    console.log('Gamma:',e.gamma);
    console.log('Beta:',e.beta);
    console.log('Alpha:',e.Alpha);
})
```
#### 用处
这种自然是web VR 中的使用场景会相对较多。

#### 浏览器支持度

### battery status
这个API就使用来获取当前的电池状态

#### 用法
```javascript
// 首先去判断当前浏览器是否支持此API
if ('getBattery' in navigator) {
    // 通过这个方法来获取battery对象
    navigator.getBattery().then(battery => {
    // battery 对象包括中含有四个属性
    // charging 是否在充电
    // level   剩余电量
    // chargingTime 充满电所需事件
    // dischargingTime  当前电量可使用时间
    const { charging, level, chargingTime, dischargingTime } = battery;
    // 同时可以给当前battery对象添加事件  对应的分别时充电状态变化 和 电量变化
    battery.onchargingchange = ev => {
        const { currentTarget } = ev;
        const { charging } = currentTarget;
    };
    battery.onlevelchange = ev => {
        const { currentTarget } = ev;
        const { level } = ev;
    }
    })
} else {
    alert('当前浏览器不支持~~~')
}
```

#### 用处
用来温馨的提示用户当前电量~~~

#### 浏览器支持度
这个浏览器的支持度很低。。。。


### execCommand 执行命令
当将HTML文档切换成设计模式时，就会暴露出 **execcommand** 方法，然后我们可以通过使用这个方法来执行一些命令，比如复制，剪切，修改选中文字粗体、斜体、背景色、颜色，缩进，插入图片等等等等。

#### 用法
用法也很简单，这里简单介绍几个，详细的介绍大家可以去[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)上看看。
这个API接受三个参数，第一个是要执行的命令，第二个参数mdn上说是Boolean用来表示是否展现用户界面，但我也没测试出来有什么不同，第三个参数就是使用对应命令所需要传递的参数。

```javascript
// 一般不会直接去操作我们本身的HTML文档，可以去插入一个iframe然后通过contentDocument来获取、操作iframe中的HTML文档。
let iframe = document.createElement('ifram');
let doc = iframe.contentDocument;
// 首先要将HTML文档切换成设计模式
doc.designMode = 'on';

// 然后就可以使用execCommand 这个命令了；
// 执行复制命令，复制选中区域
doc.execCommand('copy')
// 剪切选中区域
doc.execCommand('cut')
// 全选
doc.execCommand('selectAll')
// 将选中文字变成粗体，同时接下来输入的文字也会成为粗体，
doc.execCommand('bold')
// 将选中文字变成斜体，同时接下来输入的文字也会成为斜体，
doc.execCommand('italic')
// 设置背景颜色，，比如设置背景色为红色，就传入 'red'即可
doc.execCommand('backColor',true,'red')
```

#### 用处
我用这些命令简单的写了一个富文本的demo，大家可以看一下[Demo]()，效果如下：

#### 浏览器支持度

### CustomEvent （自定义事件）
大家都知道各种事件是如何绑定的，但是有时候这些事件不够用呢，custom event就可以解决这样的问题。

#### 用法
```javascript
let dom = document.querySelector('#app');
// 绑定事件， 传递过来的值可以通过ev.detail 来获取
dom.addEventListener('log-in',(ev) => {
    const { detail } = ev;
    console.log(detail);  // hello
})
// 派发事件，需要传入两个参数，一个是事件类型，另外一个是一个对象，detail就是传递过去的值
dom.dispatchEvent(new CustomEvent('log-in',{
    detail:'hello'
}))
```

#### 用处
绑定自定义事件，最近很火的框架[Omi](https://github.com/Tencent/omi)，其中的自定义事件就是基于customEvent实现的。

#### 浏览器支持度


### 最后
就先介绍到这些，web api越来越多，当然每个人不可能全都熟记于心，这篇文章也只是简单介绍一下，还有很多有意思而且很重要的API，比如：**web components**， **service worker**，**genric sensor**等等，不过这些都有很多人在钻研，同时文档相对较多。
相信你看完这些至少已经知道这些API的大概用法了，如果有兴趣了解用法的话，可以去看下我写的[demo](https://github.com/1921622004/webapi)，也可以去看看MDN文档去深入研究一下。


#### 参考
[MDN文档](https://developer.mozilla.org/zh-CN/)
[阮一峰大神的博客](http://www.ruanyifeng.com/blog/2018/11/page_lifecycle_api.html)
[web-api-you-dont-know 视频演讲]()