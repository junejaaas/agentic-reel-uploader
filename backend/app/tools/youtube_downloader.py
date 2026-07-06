from yt_dlp import YoutubeDL
import os


def download_video(url: str):

    output_path = os.path.join("storage", "videos")

    os.makedirs(output_path, exist_ok=True)

    ydl_opts = {
        "outtmpl": os.path.join(output_path, "%(title)s.%(ext)s"),
        "format": "bestvideo+bestaudio/best",
        "merge_output_format": "mp4",
        "ffmpeg_location": r"C:\Users\Laptop\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin"
    }

    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        video_path = ydl.prepare_filename(info)

        if not video_path.endswith(".mp4"):
            video_path = os.path.splitext(video_path)[0] + ".mp4"

    return video_path