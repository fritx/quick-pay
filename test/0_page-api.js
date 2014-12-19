var request = require('request')
var cheerio = require('cheerio')
var assert = require('assert')
var _ = require('lodash')

describe('page-api', function(){

  var formData = {
    'optEmail': '18600000000',
    'payAmount': '8.8',
    'title': 'Title',
    'memo': 'Memo bla bla bla..'
  }
  var pageHtml

  it('redirects', function(done){

    request({
      method: 'POST',
      url: 'https://shenghuo.alipay.com/send/payment/fill.htm',
      form: formData
    }, function(e, res, html){
      assert.equal(e, null)
      assert.equal(res.statusCode, 200)
      pageHtml = html
      done()
    })

  })

  it('fills form', function(done){

    var $ = cheerio.load(pageHtml)
    $form = $('form.needIframe')
    assert($form.length, 1)

    assert.equal(
      $form.find('[name=optEmail]').val(),
      formData['optEmail']
    )
    assert.equal(
      $form.find('[name=payAmount]').val(),
      // toFixed(2) to compare with field value
      Number(formData['payAmount']).toFixed(2)
    )
    assert.equal(
      $form.find('[name=title]').val(),
      formData['title']
    )
    assert.equal(
      $form.find('[name=memo]').val(),
      formData['memo']
    )
    done()

  })

})
