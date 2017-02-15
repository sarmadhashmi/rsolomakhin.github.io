/**
 * Launches payment request for Alipay.
 */
function onBuyClicked() { // eslint-disable-line no-unused-vars
  let supportedInstruments = [{
    supportedMethods: ['https://www.alipay.com/webpay'],
    data: {
      // Second transaction string:
      orderInfo: 'biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E4%B8%9C%E8%A5%BF%3B%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%3B%22%2C%22out_trade_no%22%3A%221486526346860%22%7D&sign=D46CRjKqvlbglEVqsmqLnviwJDgAQyFdI%2B%2BEG7Fm4ANn%2BXAj3IoQeZSdR%2ByjuYRyx4LQvCVJhT%2FDunCiWIxAYx8%2BVRaUE3g%2FvvglvKZYxR5AvWYx4bpb1nKk2kIgcrihi0q0JIl%2BN9ZHegYXNhLzhy1We325eC9%2B7BluRnpqsoITmMeYEbuW%2F6kblnVNTlK1Aqdlzqf5NLK3Q7cZFx3BRJoE9Lpp6rQQupmr28Kg271SG3RgW6%2BtUUUgLAmC852L8fVq6K5g0RCm3tgxCEvtaC%2FGaM0oYhJq0ZnhAJuaJETDqFfobHGpuL71GBMiL8H4Km0de%2BmNcXVHjWhsz%2BIXCg%3D%3D&method=alipay.trade.app.pay&charset=utf-8&version=1.0&app_id=2014100900013222&timestamp=2017-02-08+11%3A59%3A06&sign_type=RSA2', // eslint-disable-line max-len
    },
  }];

  let details = {
    total: {
      label: 'Donation',
      amount: {
        currency: 'USD',
        value: '55.00',
      },
    },
    displayItems: [{
      label: 'Original donation amount',
      amount: {
        currency: 'USD',
        value: '65.00',
      },
    }, {
      label: 'Friends and family discount',
      amount: {
        currency: 'USD',
        value: '-10.00',
      },
    }],
  };

  if (!window.PaymentRequest) {
    error('This browser does not support web payments.');
    return;
  }

  try {
    let request = new PaymentRequest(supportedInstruments, details);
    request.show()
      .then(function(instrumentResponse) {
        window.setTimeout(function() {
          instrumentResponse.complete('success')
            .then(function() {
              done('Thank you!', instrumentResponse);
            })
            .catch(function(err) {
              error(err);
            });
        }, 2000);
      })
      .catch(function(err) {
        error(err);
      });
  } catch (e) {
    error('Developer mistake: \'' + e.message + '\'');
  }
}
