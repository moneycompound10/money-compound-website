import json
from urllib.request import urlopen
ids = ['Maoay_AKIOY','muoLyft0lUM','ZhdgcffX10Q','Uj65vVUm_rc','YZ-bBdTjs4c','kVVgyFd9u8E']
for vid in ids:
    try:
        with urlopen(f'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json', timeout=10) as r:
            data = json.load(r)
            print(vid, data.get('title'))
    except Exception as e:
        print(vid, 'ERROR', e)
