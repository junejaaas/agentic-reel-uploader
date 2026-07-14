import os
import requests
from dotenv import load_dotenv
load_dotenv()


ACCESS_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN")
ACCOUNT_ID = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID")
NGROK_URL = os.getenv("NGROK_URL")


def create_media_container(video_path, caption):

    video_url = f"{NGROK_URL.rstrip('/')}/{video_path.lstrip('/')}"

    print("\n========================")
    print("VIDEO URL:", video_url)
    print("========================\n")

    url = f"https://graph.facebook.com/v25.0/{ACCOUNT_ID}/media"

    payload = {
        "media_type": "REELS",
        "video_url": video_url,
        "caption": caption,
        "access_token": ACCESS_TOKEN,
    }

    response = requests.post(url, data=payload)

    print(response.status_code)
    print(response.json())

    return response.json()

import time


def publish_media(creation_id):

    url = f"https://graph.facebook.com/v25.0/{ACCOUNT_ID}/media_publish"

    payload = {
        "creation_id": creation_id,
        "access_token": ACCESS_TOKEN
    }

    response = requests.post(url, data=payload)

    print(response.status_code)
    print(response.json())

    return response.json()

def get_media_status(creation_id):
    url = f"https://graph.facebook.com/v25.0/{creation_id}"

    params = {
        "fields": "status_code",
        "access_token": ACCESS_TOKEN,
    }

    response = requests.get(url, params=params)

    return response.json()