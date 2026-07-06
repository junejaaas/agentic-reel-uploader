CAPTION_PROMPT = """
You are an expert Instagram Reel creator.

Generate content for the following transcript.

Requirements:

1. Create a catchy title.
2. Write an engaging caption.
3. Add a CTA.
4. Generate exactly 10 hashtags.

Return ONLY valid JSON.

Rules:
- No markdown
- No explanation
- hashtags MUST always exist
- hashtags MUST be an array of exactly 10 strings

Format:

{{
    "title": "...",
    "caption": "...",
    "hashtags": [
        "#AI",
        "#Python",
        "#Programming",
        "#Technology",
        "#Coding",
        "#Developer",
        "#MachineLearning",
        "#LLM",
        "#Shorts",
        "#Reels"
    ]
}}

Transcript:

{transcript}
"""