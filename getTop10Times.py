import requests
import json

res = requests.get("https://www.speedrun.com/api/v1/games/9dow9e1p/levels")
res = res.json()
trackNames = []
for level in res['data']:
    levelData = {}
    for link in level['links']:
        if(link['rel'] == 'leaderboard'):
            levelData["leaderboard_uri"] = link["uri"]
    levelData["name"] = level['name']
    levelData["id"] = level['id']
    trackNames.append(levelData)

trackList = []
for track in trackNames:
    trackInfo = requests.get(track["leaderboard_uri"] + "?top=10")
    trackInfo = trackInfo.json()
    track['leaderboard'] = trackInfo["data"]["runs"]
    trackList.append(track)

with open("src/paddyboard_data.json", "w") as f:
    f.write(json.dumps(trackList, f, indent=4))
