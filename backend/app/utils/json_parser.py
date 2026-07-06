import json
import re


def extract_json(text: str):
    try:
        return json.loads(text)
    except Exception:

        match = re.search(r"\[[\s\S]*\]", text)

        if match:
            return json.loads(match.group())

        match = re.search(r"\{[\s\S]*\}", text)

        if match:
            return json.loads(match.group())

        raise ValueError("No valid JSON found.")