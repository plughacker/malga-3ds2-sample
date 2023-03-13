// url do seu servidor
const baseUrl = 'http://localhost:3000';

// obter dados de uma charge
async function getCharge(id) {
  const response = await fetch(`${baseUrl}/v1/charges?transaction=${id}`);
  return await response.json();
}

// criar uma charge usando 3ds2
async function createCharge(cardNumber) {
    const payload = {
        'amount': 9,
        'capture': true,        
        'paymentSource': {
          'sourceType': 'card',
          'card': {
            'cardNumber': cardNumber,
            'cardCvv': '737',
            'cardExpirationDate': '03/2030',
            'cardHolderName': 'John Smith'
          }
        },
        'paymentMethod': {
          'paymentType': 'credit',
          'installments': 1
        },
        'statementDescriptor': `Teste 3DS2 malga ${new Date().getTime()}`,
        'threeDSecure2': {
          'redirectURL': 'http://localhost:3000/checkout.html',
          'requestorURL': 'http://localhost:3000',
          'billingAddress': {
            'city': 'Aracaju',
            'country': 'BR',
            'streetNumber': '177',
            'zipCode': '49089185',
            'state': 'Sergipe',
            'street': 'Rua J'
          },
          'browser': {
            'ip': '200.53.196.214',
            'userAgent': navigator.userAgent,
            'acceptHeader': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'language': navigator.language,
            'colorDepth': screen.colorDepth,
            'screenHeight': screen.height,
            'screenWidth': screen.width,
            'timeZoneOffset': new Date().getTimezoneOffset().toString(),
            'javaEnabled': navigator.javaEnabled(),
            'javaScriptEnabled': true
          }
        }
      }

    const response = await fetch(`${baseUrl}/v1/charges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
}
