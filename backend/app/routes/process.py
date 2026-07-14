from fastapi import APIRouter
from pydantic import BaseModel
from app.graph.workflow import workflow
from langgraph.types import Command
import uuid
from pydantic import BaseModel

class ApproveRequest(BaseModel):
    thread_id: str
    highlights: list

router = APIRouter()

class ProcessRequest(BaseModel):
    youtube_url: str


@router.post("/process")
def process_video(data: ProcessRequest):
    thread_id = str(uuid.uuid4())
    state = {
        "youtube_url": data.youtube_url,
        "video_path": "",
        "transcript": "",
        "transcript_segments": [],
        "transcript_path": "",
        "video_info": {},
        "highlights": []
    }

    result = workflow.invoke(state, config={"configurable" : {"thread_id" : thread_id}})

    if "__interrupt__" in result:

        return {
            "status": "waiting_for_approval",
            "thread_id": thread_id,
            "highlights": result["__interrupt__"][0].value["highlights"]
        }

    return {
        "status": "completed",
        "thread_id": thread_id,
        "highlights": result["highlights"]
    }

@router.post("/approve")
def approve(data: ApproveRequest):

    result = workflow.invoke(
        Command(
            resume={
                "highlights": data.highlights
            }
        ),
        config={
            "configurable": {
                "thread_id": data.thread_id
            }
        }
    )

    return {
        "status": "uploaded",
        "message": "Approved clips uploaded successfully."
    }