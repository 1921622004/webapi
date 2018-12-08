### page visibility
page lifecycle 

window.onblur  只有多个tab页
window.addEventListener('visibilitychange',() => {
    switch(document.visibilityState){
        case'prerender':
        case'hidden':
        case'visible':
    }
})

usage:
video 
game

### onlineState 
window.addEventListener('offline || online')

network status

usage: 
video
offline fetch


### vibration
navigator.vibrate()

usage:
game
validate


### device orientation
window.addEventListener('deviceorientation',e => {
    console.log('Gamma:',e.gamma);
    console.log('Beta:',e.beta);
    console.log('Alpha:',e.Alpha);
})

usage:
vr ar

### clipboard
flash
```javascript
// user interaction is required;
let btn = document.querySelector('button');
btn.addEventListener('click',() => {
    select();
    copy()
})

function select(){
    let input = document.querySelector('input');
    input.focus();
    input.setSelectionRange(0,input.value.length); 
}

function copt(){
    try{
        document.execCommand('copy');
    }
}

document.addEventListener('copy || cut || paste',e => {
    console.log(e.clipbordData.getData('text/plain'))
})

```
clipborad.js

### ambient light
```js
window.addEventListener('devicelight',e => {
    console.log(e.value + ' lux')
})

let sensor = new AmbientLightSensor();
sensor.start();
sensor.onchange = e => {
    console.log(e.reading.illuminance);
}
sersor.stop();
```
usage:
notice

### battery status
```js
navigator.getBattery().then(battery => {
    console.log(`${battery.level * 100}%`);
    battery.addEventListener('levelchange',function(){
        console.log(this.level)
    })
})
```


### generic sensor API


### dispatch  customEvent


### execCommand


### serviceWorker


### push notification

### web NFC


### gamepad

```js
window.addEventListener('gamepadconnected',() => {
    let gp = navigator.getGamepads()[0];
    console.log(gp)
})
```

### requestAnimationFrame  && idle