;(function(){

var $ = window.jQuery || Zepto

function redirect(data){
  var $form = $('<form target="_self" method="POST" action="https://shenghuo.alipay.com/send/payment/fill.htm">')
  $form.append(
    '<input name="optEmail" value="'+ (data['to'] || '') +'">'
  )
  $form.append(
    '<input name="payAmount" value="'+ (data['amount'] || '') +'">'
  )
  $form.append(
    '<input name="title" value="'+ (data['title'] || '') +'">'
  )
  $form.append(
    '<input name="memo" value="'+ (data['body'] || '') +'">'
  )
  $form.submit()
}

window.quickPay = redirect

})();
