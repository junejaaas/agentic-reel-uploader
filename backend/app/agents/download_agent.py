from app.models.state import WorkflowState
from app.tools.youtube_downloader import download_video

def download_agent(state : WorkflowState):
    print("\nDownloading video...")
    url = state['youtube_url']
    video_path = download_video(url)
    state['video_path'] = video_path
    return state