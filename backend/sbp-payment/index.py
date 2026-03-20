import json
import os
import uuid
import urllib.request
import urllib.error
import base64

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def handler(event: dict, context) -> dict:
    """Создаёт платёж через СБП (ЮКassa) и возвращает ссылку для оплаты."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    amount = body.get('amount')
    description = body.get('description', 'Покупка на сервере KLEVER')
    return_url = body.get('return_url', 'https://klever.ru')
    nick = body.get('nick', '')

    if not amount or float(amount) <= 0:
        return {
            'statusCode': 400,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Укажите сумму платежа'}),
        }

    shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')

    if not shop_id or not secret_key:
        return {
            'statusCode': 500,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Платёжный шлюз не настроен'}),
        }

    idempotence_key = str(uuid.uuid4())
    credentials = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()

    payload = {
        'amount': {
            'value': f'{float(amount):.2f}',
            'currency': 'RUB',
        },
        'payment_method_data': {
            'type': 'sbp',
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': return_url,
        },
        'capture': True,
        'description': f'{description} (ник: {nick})' if nick else description,
        'metadata': {
            'nick': nick,
        },
    }

    req = urllib.request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Basic {credentials}',
            'Content-Type': 'application/json',
            'Idempotence-Key': idempotence_key,
        },
        method='POST',
    )

    response = urllib.request.urlopen(req, timeout=10)
    result = json.loads(response.read().decode('utf-8'))

    confirmation_url = result.get('confirmation', {}).get('confirmation_url', '')
    payment_id = result.get('id', '')

    return {
        'statusCode': 200,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'payment_id': payment_id,
            'confirmation_url': confirmation_url,
            'status': result.get('status'),
        }),
    }
