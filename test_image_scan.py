import requests
from PIL import Image
import io
import os

URL = "http://127.0.0.1:8000/scan/image"
API_KEY = "phishguard-secret-key"

def create_dummy_image():
    # Create a red image 100x100
    img = Image.new('RGB', (100, 100), color = 'red')
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return buf

def test_scan():
    print("Generating dummy image...")
    image_data = create_dummy_image()
    
    files = {'file': ('test.png', image_data, 'image/png')}
    headers = {'X-API-Key': API_KEY}
    
    print(f"Sending request to {URL}...")
    try:
        response = requests.post(URL, files=files, headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("SUCCESS: Endpoint reachable and processing.")
        else:
            print("FAILURE: Endpoint returned error.")
            
    except Exception as e:
        print(f"Error: {e}")
        print("Ensure the server is running!")

if __name__ == "__main__":
    test_scan()
