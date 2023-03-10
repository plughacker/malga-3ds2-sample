// url do seu servidor
const baseUrl = 'http://localhost:3000';

// obter dados de uma charge
function getCharge(id, callback) {
  $.get(`${baseUrl}/v1/charges`, { 
    'transaction': id
  }, function(response) {
    callback(response);    
  });
}

// criar uma charge usando 3ds2
function createCharge(cardNumber) {
    const payload = {
        "amount": 9,
        "capture": true,        
        "paymentSource": {
          "sourceType": "card",
          "card": {
            "cardNumber": cardNumber,
            "cardCvv": "737",
            "cardExpirationDate": "03/2030",
            "cardHolderName": "John Smith"
          }
        },
        "paymentMethod": {
          "paymentType": "credit",
          "installments": 1
        },
        "statementDescriptor": `Teste 3DS2 malga ${new Date().getTime()}`,
        "threeDSecure2": {
          "redirectURL": "http://localhost:3000/checkout.html",
          "requestorURL": "http://localhost:3000",
          "billingAddress": {
            "city": "Aracaju",
            "country": "BR",
            "streetNumber": "177",
            "zipCode": "49089185",
            "state": "Sergipe",
            "street": "Rua J"
          },
          "browser": {
            "ip": "200.53.196.214",
            "userAgent": navigator.userAgent,
            "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "language": navigator.language,
            "colorDepth": screen.colorDepth,
            "screenHeight": screen.height,
            "screenWidth": screen.width,
            "timeZoneOffset": new Date().getTimezoneOffset().toString(),
            "javaEnabled": navigator.javaEnabled(),
            "javaScriptEnabled": true
          }
        }
      }

      $.ajax({
        type: "POST",
        url: `${baseUrl}/v1/charges`,
        data: JSON.stringify(payload),
        success: function (response) {

          localStorage.setItem('transaction_id', response.id)

          if (response?.threeDSecure2?.authData?.response?.url === undefined) {
            location.href = '/checkout.html';
            return
          }

          // monta formulário de redirect
          $('#pageform').attr('action', response.threeDSecure2.authData.response.url);
          $('#pageform input[name="MD"]').val(response.threeDSecure2.authData.response.md);
          $('#pageform input[name="PaReq"]').val(response.threeDSecure2.authData.response.paReq);
          $('#pageform input[name="TermUrl"]').val(response.threeDSecure2.authData.response.termUrl);

          // envia os dados para iniciar o processo de redirect (autenticação e autorização) com desafio ou sem desafio
          $('#pageform').submit();

          $(this).text('Comprar');
          $(this).attr('disabled', false);
        },
        dataType: 'json',
        contentType: 'application/json'
      });
}
