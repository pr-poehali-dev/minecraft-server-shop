import socket
import struct
import json
import time

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

def ping_minecraft(host: str, port: int, timeout: float = 4.0) -> dict:
    """Пингует Minecraft Java сервер по протоколу handshake и возвращает онлайн."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    sock.connect((host, port))

    def send_packet(data: bytes):
        length = len(data)
        # VarInt length prefix
        buf = b''
        while True:
            b = length & 0x7F
            length >>= 7
            if length:
                b |= 0x80
            buf += bytes([b])
            if not length:
                break
        sock.sendall(buf + data)

    def read_varint() -> int:
        num = 0
        shift = 0
        while True:
            b = ord(sock.recv(1))
            num |= (b & 0x7F) << shift
            shift += 7
            if not (b & 0x80):
                return num

    def read_bytes(n: int) -> bytes:
        data = b''
        while len(data) < n:
            chunk = sock.recv(n - len(data))
            if not chunk:
                break
            data += chunk
        return data

    # Handshake packet
    host_bytes = host.encode('utf-8')
    host_len = len(host_bytes)
    # VarInt encode host_len
    hl_enc = b''
    tmp = host_len
    while True:
        b = tmp & 0x7F
        tmp >>= 7
        if tmp:
            b |= 0x80
        hl_enc += bytes([b])
        if not tmp:
            break

    handshake = (
        b'\x00'          # packet id 0x00
        + b'\xf5\x05'   # protocol version 765 (1.20.4) as VarInt
        + hl_enc + host_bytes
        + struct.pack('>H', port)
        + b'\x01'        # next state: status
    )
    send_packet(handshake)

    # Status request
    send_packet(b'\x00')

    # Read response
    _ = read_varint()   # packet length
    _ = read_varint()   # packet id
    str_len = read_varint()
    raw = read_bytes(str_len)
    sock.close()

    data = json.loads(raw.decode('utf-8'))
    online = data.get('players', {}).get('online', 0)
    max_players = data.get('players', {}).get('max', 0)
    version = data.get('version', {}).get('name', 'Unknown')
    description = data.get('description', '')
    if isinstance(description, dict):
        description = description.get('text', '')

    return {
        'online': True,
        'players': online,
        'max_players': max_players,
        'version': version,
        'description': description,
    }


def handler(event: dict, context) -> dict:
    """Проверяет онлайн Minecraft-сервера и возвращает количество игроков."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    host = '185.9.145.187'
    port = 30043

    try:
        result = ping_minecraft(host, port)
        return {
            'statusCode': 200,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps(result),
        }
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'online': False,
                'players': 0,
                'max_players': 0,
                'version': '',
                'description': '',
                'error': str(e),
            }),
        }
