import os
import subprocess


def create_clip(video_path: str, start: float, end: float, clip_number: int):

    os.makedirs("storage/clips", exist_ok=True)

    output_path = os.path.join(
        "storage",
        "clips",
        f"clip_{clip_number}.mp4"
    )

    duration = end - start

    command = [
        "ffmpeg",
        "-y",
        "-ss",
        str(start),
        "-i",
        video_path,
        "-t",
        str(duration),
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        output_path
    ]

    subprocess.run(command, check=True)

    return output_path