import time

from tools.instagram_tool import (
    create_media_container,
    publish_media
)

container = create_media_container(
    "/storage/clips/clip_1.mp4",
    "Testing AI Shorts Agent 🚀"
)

creation_id = container["id"]

print("Waiting for Instagram...")

time.sleep(15)

publish_media(creation_id)