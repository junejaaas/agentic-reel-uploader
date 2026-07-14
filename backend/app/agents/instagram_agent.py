from app.models.state import WorkflowState
from app.tools.instagram_tool import (
    create_media_container,
    publish_media,
    get_media_status,
)

import time


def instagram_agent(state: WorkflowState):

    print("\nPosting approved clips to Instagram...")

    for clip in state["highlights"]:

        if clip["status"] != "approved":
            continue

        caption = clip["caption"] + "\n\n" + " ".join(clip["hashtags"])

        container = create_media_container(
            clip["clip_path"],
            caption
        )

        creation_id = container["id"]

        print(f"Created Container: {creation_id}")

        status = ""

        while status != "FINISHED":

            result = get_media_status(creation_id)

            status = result.get("status_code")

            print("Status:", status)

            if status == "ERROR":
                print(result)
                break

            time.sleep(5)

        publish = publish_media(creation_id)

        print(f"Published: {publish}")

    return state