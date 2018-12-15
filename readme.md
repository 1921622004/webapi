# 你（可能）不知道的webapi

### 简介
作为前端er，我们的工作与web是分不开的，随着HTML5的日益壮大，浏览器自带的webapi也随着增多。本篇文章主要选取了几个有趣且有用的webapi进行介绍，分别介绍其用法、用处以及浏览器支持度，同时我也分别为这几个api都做了一个简单的[demo](https://github.com/1921622004/webapi)（真的很简单，样式等于没有~）这几个api分别是：
 - page lifecycle
 - onlineState
 - ambient light sensor
 - 利用deviceOrientation制作一个随着手机旋转的正方体
 - copy事件 以及 使用execCommand完成复制粘贴功能
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

### copy事件 & 复制粘贴
复制粘贴这个功能很常用了，比如各种资源网站，点击一下复制内容到你的剪切板，这个功能怎么做呢？大家请看代码。

#### 用法
```javascript
let input = document.querySelector('#input');
// 要先获取焦点
input.focus();
// 设置选中长度
input.setSelectionRange(0,input.value.length);
// execCommand 这个API稍后会详细的介绍
document.execCommand('copy');
// 
```









#### 参考
http://www.zhangyunling.com/725.html