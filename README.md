# quick-pay

Quick Payment Entry for [Alipay](https://www.alipay.com)

Inspired By: [wdkwdkwdk/Onepay](https://github.com/wdkwdkwdk/Onepay)

Live Demo: <https://fritx.github.io/quick-pay>

## Usage

```js
$('#donate').on('click', function gotoPay(){
  quickPay({
    'to': '18600000000',
    'amount': '88.8',
    'title': 'Donate!',
    'body': 'This is a project which...'
  })
})
```

## What Counts?

- Style-free: No `<form>` to display
- Flexible: Call in code
- Reliable: Phantom testing via [nightmare](https://github.com/segmentio/nightmare)
