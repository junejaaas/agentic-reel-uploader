import subprocess
import json


def get_video_info(video_path):

    command = [
        "ffprobe",
        "-v",
        "quiet",
        "-print_format",
        "json",
        "-show_format",
        "-show_streams",
        video_path
    ]

    result = subprocess.run(
        command,
        capture_output=True,
        text=True
    )

    info = json.loads(result.stdout)

    video_stream = next(
        stream
        for stream in info["streams"]
        if stream["codec_type"] == "video"
    )

    return {

        "duration": float(info["format"]["duration"]),

        "width": video_stream["width"],

        "height": video_stream["height"],

        "fps": eval(video_stream["r_frame_rate"])

    }