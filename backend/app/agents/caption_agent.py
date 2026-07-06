import os
import json

from groq import Groq

from app.models.state import WorkflowState
from app.prompts.caption_prompt import CAPTION_PROMPT


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def caption_agent(state: WorkflowState):

    print("\nGenerating captions...")

    for clip in state["highlights"]:

        prompt = CAPTION_PROMPT.format(
            transcript=clip["transcript"]
        )

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7
        )
        content = response.choices[0].message.content

        result = json.loads(content)

        clip["title"] = result["title"]

        clip["caption"] = result["caption"]

        clip["hashtags"] = result["hashtags"]

    return state