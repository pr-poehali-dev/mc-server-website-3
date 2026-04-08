import socket
import struct
import json
import time


def handler(event: dict, context) -> dict:
    """Пингует Minecraft сервер и возвращает статус, количество игроков онлайн и максимум."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    host = 'hedgehog8888.aternos.me'
    port = 35185
    timeout = 8

    try:
        result = ping_minecraft(host, port, timeout)
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps(result)
        }
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({
                'online': False,
                'players_online': 0,
                'players_max': 0,
                'version': '',
                'motd': '',
                'player_list': [],
                'error': str(e)
            })
        }


def ping_minecraft(host: str, port: int, timeout: int) -> dict:
    """Minecraft Server List Ping протокол (1.7+)"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    sock.connect((host, port))

    # Handshake packet
    host_bytes = host.encode('utf-8')
    data = b''
    data += b'\x00'                          # packet id
    data += b'\x2f'                          # protocol version (47 = 1.8)
    data += _pack_varint(len(host_bytes))
    data += host_bytes
    data += struct.pack('>H', port)          # port
    data += b'\x01'                          # next state: status

    sock.send(_pack_varint(len(data)) + data)

    # Status request
    sock.send(b'\x01\x00')

    # Read response
    _read_varint(sock)   # packet length
    _read_varint(sock)   # packet id

    # Read JSON string length
    json_length = _read_varint(sock)
    raw = b''
    while len(raw) < json_length:
        chunk = sock.recv(json_length - len(raw))
        if not chunk:
            break
        raw += chunk

    sock.close()

    data_json = json.loads(raw.decode('utf-8'))

    players = data_json.get('players', {})
    version = data_json.get('version', {}).get('name', '')
    motd = _strip_motd(data_json.get('description', ''))

    # Список ников онлайн-игроков (если сервер отдаёт sample)
    sample = players.get('sample', [])
    player_list = [p.get('name', '') for p in sample if p.get('name')]

    return {
        'online': True,
        'players_online': players.get('online', 0),
        'players_max': players.get('max', 0),
        'version': version,
        'motd': motd,
        'player_list': player_list,
    }


def _pack_varint(value: int) -> bytes:
    result = b''
    while True:
        byte = value & 0x7F
        value >>= 7
        if value:
            byte |= 0x80
        result += bytes([byte])
        if not value:
            break
    return result


def _read_varint(sock: socket.socket) -> int:
    result = 0
    shift = 0
    while True:
        byte = ord(sock.recv(1))
        result |= (byte & 0x7F) << shift
        if not (byte & 0x80):
            break
        shift += 7
    return result


def _strip_motd(description) -> str:
    if isinstance(description, str):
        import re
        return re.sub(r'§.', '', description)
    if isinstance(description, dict):
        text = description.get('text', '')
        extra = description.get('extra', [])
        for part in extra:
            if isinstance(part, dict):
                text += part.get('text', '')
            elif isinstance(part, str):
                text += part
        import re
        return re.sub(r'§.', '', text)
    return ''