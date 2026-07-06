from faster_whisper import WhisperModel
import os
import json

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)


def transcribe_video(video_path):

    os.makedirs("storage/transcripts", exist_ok=True)

    whisper_segments, info = model.transcribe(video_path)

    transcript = ""

    segments = []

    for segment in whisper_segments:

        transcript += (
            f"[{segment.start:.2f} - {segment.end:.2f}] "
            f"{segment.text}\n"
        )

        segments.append({
            "start": segment.start,
            "end": segment.end,
            "text": segment.text.strip()
        })

    filename = os.path.splitext(
        os.path.basename(video_path)
    )[0] + ".txt"

    transcript_path = os.path.join(
        "storage",
        "transcripts",
        filename
    )

    with open(transcript_path, "w", encoding="utf-8") as f:
        f.write(transcript)

    segments_path = os.path.join(
    "storage",
    "transcripts",
    os.path.splitext(os.path.basename(video_path))[0] + "_segments.json"
)

    with open(segments_path, "w", encoding="utf-8") as f:
        json.dump(segments, f, indent=4)

    return transcript, segments, transcript_path