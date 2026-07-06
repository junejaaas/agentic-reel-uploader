HIGHLIGHT_PROMPT = """
You are an expert YouTube Shorts creator.

Your task is to analyze the video transcript and identify the BEST moments
that can become viral YouTube Shorts or Instagram Reels.

Video Information

Duration: {duration} seconds

FPS: {fps}

Rules:

1. Each clip should be between 30 and 60 seconds.
2. Prioritize:
   - Strong hooks
   - Educational insights
   - Surprising facts
   - Funny moments
   - Emotional moments
3. Select at most 5 clips.
4. Return ONLY valid JSON.

Return in this format:

[
    {{
        "start": 15.5,
        "end": 52.8,
        "reason": "Strong hook about AI",
        "viral_score": 95
    }}
]

Transcript:

{transcript}
"""