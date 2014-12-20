var Nightmare = require('nightmare')
var assert = require('assert')
var path = require('path')
var _ = require('lodash')

var payData = {
  'to': '18600000000',
  'amount': '88.8',
  'title': 'Donate!',
  'body': 'This is a project which...'
}


describe('quick-pay', function(){

  this.timeout(20000)

  it('works', function(done){

    new Nightmare({ weak: false })
      .goto('about:blank')
      .wait()
      .inject('js', f('../includes/jquery-2.1.3.min.js'))
      .inject('js', f('../quick-pay.js'))
      .evaluate(new Function(
        'window.payData='+ JSON.stringify(payData)
      ))
      .evaluate(function(){
        var $btn = $('<button class="donate">Donate!</button>')
        $btn.on('click', function(){
          quickPay(payData)
        }).appendTo('body')
      })
      .click('.donate')
      .wait()
      .url(function(url){
        // test url
        assert.equal(url, 'https://shenghuo.alipay.com/send/payment/fill.htm')
      })
      .inject('js', f('../includes/jquery-2.1.3.min.js'))
      .evaluate(function(){
        var $form = $('form.needIframe')
        return {
          array: $form.serializeArray()
        }
      }, function(ret){
        var fields = _.reduce(ret.array, function(memo, item){
          memo[item.name] = item.value
          return memo
        }, {})
        // test form fields
        assert.equal(
          fields['optEmail'], payData['to']
        )
        assert.equal(
          fields['payAmount'],
          // toFixed(2) to compare with field value
          Number(payData['amount']).toFixed(2)
        )
        assert.equal(
          fields['title'], payData['title']
        )
        assert.equal(
          fields['memo'], payData['body']
        )
      })
      .run(function(e){
        assert.equal(e, null)
        done()
      })
  })
  
})


function f(file){
  return path.resolve(__dirname, file)
}
