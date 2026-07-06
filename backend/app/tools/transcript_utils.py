def get_clip_transcript(segments, start_time, end_time):

    clip_text = []

    for segment in segments:

        if segment["end"] >= start_time and segment["start"] <= end_time:

            clip_text.append(segment["text"])

    return " ".join(clip_text)