from langgraph.graph import StateGraph, END
from app.agents.download_agent import download_agent
from app.agents.transcript_agent import transcript_agent
from app.agents.highlight_agent import highlight_agent
from app.agents.editing_agent import editing_agent
from app.models.state import WorkflowState
from app.agents.video_analysis_agent import video_analysis_agent
from app.agents.caption_agent import caption_agent
from app.agents.approval_agent import approval_agent
from app.agents.finalize_agent import finalize_agent
from app.agents.instagram_agent import instagram_agent
from langgraph.checkpoint.memory import InMemorySaver

graph = StateGraph(WorkflowState)

graph.add_node("download", download_agent)
graph.add_node("transcript",transcript_agent)
graph.add_node("highlight", highlight_agent)
graph.add_node("editing", editing_agent)
graph.add_node("video_analysis", video_analysis_agent)
graph.add_node("caption", caption_agent)
graph.add_node("approval", approval_agent)
graph.add_node("finalize", finalize_agent)
graph.add_node("instagram", instagram_agent)

graph.set_entry_point("download")

graph.add_edge("download", "video_analysis")
graph.add_edge("video_analysis", "transcript")
graph.add_edge("transcript", "highlight")
graph.add_edge("highlight", "editing")
graph.add_edge("editing", "caption")
graph.add_edge("caption", "approval")
graph.add_edge("approval", "finalize")
graph.add_edge("finalize", "instagram")
graph.add_edge("instagram", END)

ck = InMemorySaver()

workflow = graph.compile(checkpointer = ck)