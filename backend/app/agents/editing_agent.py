from app.models.state import WorkflowState
from app.tools.ffmpeg_tool import create_clip


def editing_agent(state: WorkflowState):

    print("\nGenerating Shorts...")

    for index, clip in enumerate(state["highlights"], start=1):

        clip_path = create_clip(
            video_path=state["video_path"],
            start=clip["start"],
            end=clip["end"],
            clip_number=index
        )

        clip["clip_path"] = clip_path.replace("\\", "/")

    return state