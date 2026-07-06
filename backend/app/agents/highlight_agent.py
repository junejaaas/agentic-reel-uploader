from app.models.state import WorkflowState
from groq import Groq
from app.prompts.highlight_prompt import HIGHLIGHT_PROMPT
from dotenv import load_dotenv
import os
import json

load_dotenv()
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def highlight_agent(state: WorkflowState):

    print("\nFinding Highlights...")

    prompt = HIGHLIGHT_PROMPT.format(

    transcript=state["transcript"],

    duration=state["video_info"]["duration"],

    fps=state["video_info"]["fps"]
    )

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
    )

    highlights = json.loads(
        response.choices[0].message.content
    )
    from app.tools.transcript_utils import get_clip_transcript

    for clip in highlights:

        clip["transcript"] = get_clip_transcript(
            state["transcript_segments"],
            clip["start"],
            clip["end"]
            )
        
        clip["status"] = "pending"

    state["highlights"] = highlights

    return state