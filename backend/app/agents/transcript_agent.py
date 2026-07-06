import json
import os

from app.models.state import WorkflowState
from app.tools.whisper_tool import transcribe_video


def transcript_agent(state: WorkflowState):

    video_name = os.path.splitext(
        os.path.basename(state["video_path"])
    )[0]

    transcript_path = os.path.join(
        "storage",
        "transcripts",
        f"{video_name}.txt"
    )

    segments_path = os.path.join(
        "storage",
        "transcripts",
        f"{video_name}_segments.json"
    )

    if os.path.exists(transcript_path) and os.path.exists(segments_path):

        print("\nTranscript already exists. Loading...")

        with open(transcript_path, "r", encoding="utf-8") as f:
            transcript = f.read()

        with open(segments_path, "r", encoding="utf-8") as f:
            segments = json.load(f)

    else:

        print("\nGenerating transcript...")

        transcript, segments, transcript_path = transcribe_video(
            state["video_path"]
        )

    state["transcript"] = transcript
    state["transcript_segments"] = segments
    state["transcript_path"] = transcript_path

    return state