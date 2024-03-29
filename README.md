# Exemplo de como integrar com 3DS2 na malga

Criamos esse exemplo para ajudá-lo a implementar a utilização do 3ds2 em seu sistema. Temos um servidor simples em node que simula o seu backend e 2 arquivos html que simulam o fluxo de compra.

## primeiros passos

Para testar esse fluxo você precisa de um merchant_id com o provedor da adyen configurado. Caso você não tenha um merchant_id com provedor adyen, você pode criar usando o curl abaixo:

```sh
curl --location 'https://api.malga.io/v1/merchants' \
--header 'x-api-key: <API_KEY>' \
--header 'x-client-id: <CLIENT_ID>' \
--header 'Content-Type: application/json' \
--data '{
    "mcc": "4041",
    "providers": [{
        "priority": 1,
        "name": "ADYEN",
        "credentials": {
            "type": "ADYEN",
            "apiKey": "<ADYEN_API_KEY>",
            "liveUrlPrefix": "",
            "webhookHmacKey": "",
            "merchantAccount": "<MERCHANT_ACCOUNT>"
        }
    }]
}'
```

Para mais detalhes consulte a documentação de merchant https://docs.malga.io/api#operation/createMerchant

Estando com merchant_id em mãos você precisa criar um arquivo `.env` com a configuração a seguir:

```sh
MERCHANT_ID=
API_KEY=
CLIENT_ID=
BASE_URL=https://api.malga.io
```

Informe seu merchant_id, api_key e client_id

## Dependências

Para rodar o projeto você precisa ter a versão 16.x do nodejs, para instalar você pode consultar a documentação oficial em https://nodejs.org/en/download/

## Rodando o projeto

Primeiro instale o projeto, em seguida você pode iniciar o servidor

```sh
npm install
npm run serve
```

Agora acesse http://localhost:3000

Você verá 4 botões com simulações de comportamentos possíveis.

Selecione um dos quatro exemplos então clique em `Realizar Pagamento`

Obs: Perceba que a simulação do exemplo de cartão sem suporte ao 3DS não redireciona para página do provedor, o fluxo é mais curto.

## Demo

Preparamos um vídeo bem curto demostrando o resultado esperado desse projeto de demonstração

https://user-images.githubusercontent.com/107397876/224799149-f33368c0-f37e-45fd-8eb5-85cd264d7c6a.mp4




