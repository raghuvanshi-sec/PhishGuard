import requests
import json

URL = "http://127.0.0.1:8000/stats/map"

def test_map():
    print(f"Fetching map stats from {URL}...")
    try:
        res = requests.get(URL)
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            data = res.json()
            print(f"Received {len(data)} locations.")
            if len(data) > 0:
                print("First item:", json.dumps(data[0], indent=2))
                if "lat" in data[0] and "lng" in data[0] and "type" in data[0]:
                    print("SUCCESS: Data structure valid.")
                else:
                    print("FAILURE: Invalid data structure.")
        else:
            print("FAILURE: Endpoint error.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_map()
