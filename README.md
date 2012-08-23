# jQuery plugin: Detect mouse over disabled element

With the disabled elements jQuery is not able to detect the mouse events (mouseout, mousein, mouseover). To fix this issue this plugin has been created.

## How to use

You can apply the plugin to some specific elements, or to a top element:
```javascript
$('#mydisabledelement,.other-elements').detectmouseoverdisabled();
$('form').detectmouseoverdisabled(); // all the disabled INPUT, TEXTAREA and SELECT elements  are used
$('form').detectmouseoverdisabled({ele:'input,textarea'}); // only the disabled INPUT and TEXTAREA are used
```

## More info

Look at the official webpage : http://jasonlau.biz/home/jquery/detect-mouse-over-disabled-a-jquery-plugin