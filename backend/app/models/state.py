from typing import TypedDict
from app.models.highlight import Highlight

class WorkflowState(TypedDict):
    youtube_url: str
    video_path: str
    transcript: str
    transcript_segments: list
    transcript_path: str
    video_info: dict
    highlights: list[Highlight]