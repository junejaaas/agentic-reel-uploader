from app.models.state import WorkflowState

from app.tools.video_info import get_video_info


def video_analysis_agent(state: WorkflowState):

    print("\nAnalyzing Video...")

    state["video_info"] = get_video_info(
        state["video_path"]
    )

    return state
