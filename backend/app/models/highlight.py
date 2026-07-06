from typing import TypedDict

class Highlight(TypedDict):
    start: float
    end: float
    reason: str
    viral_score: int
    transcript: str

    clip_path: str

    title: str
    caption: str
    hashtags: list[str]

    status : str