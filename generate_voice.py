import asyncio
import os
import time
# pyrefly: ignore [missing-import]
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-US-AriaNeural"

# Total 720 frames (24.0s @ 30 FPS)
# Scene 01 (0-120f / 4s): f48 -> f112 (must end before f120)
# Scene 02 (120-240f / 4s): f124 -> f225 (must end before f240)
# Scene 03 (240-390f / 5s): f248 -> f360 (must end before f390)
# Scene 04 (390-540f / 5s): f396 -> f510 (must end before f540)
# Scene 05 (540-660f / 4s): f572 -> f640 (must end before f660)
# Scene 06 (660-720f / 2s): f665 -> f712 (must end before f720)

SCENES = [
    {
        "id": "scene01",
        "text": "It’s after 10 PM.",
        "rate": "+8%",
        "startFrame": 48,
    },
    {
        "id": "scene02",
        "text": "Think, design, build.",
        "rate": "+10%",
        "startFrame": 124,
    },
    {
        "id": "scene03",
        "text": "Transforming ideas into digital products.",
        "rate": "+10%",
        "startFrame": 248,
    },
    {
        "id": "scene04",
        "text": "Made to work. Built for what’s next.",
        "rate": "+10%",
        "startFrame": 396,
    },
    {
        "id": "scene05",
        "text": "After 10 PM Studio.",
        "rate": "+6%",
        "startFrame": 572,
    },
    {
        "id": "scene06",
        "text": "after 10 pm dot x y z.",
        "rate": "+28%",
        "startFrame": 662,
    },
]

os.makedirs("public/voiceover", exist_ok=True)

async def generate_single(item):
    path = f"public/voiceover/{item['id']}.mp3"
    for attempt in range(4):
        try:
            comm = edge_tts.Communicate(item["text"], VOICE, rate=item["rate"])
            await comm.save(path)
            audio = MP3(path)
            dur_sec = audio.info.length
            dur_frames = round(dur_sec * 30)
            end_frame = item["startFrame"] + dur_frames
            print(f"[{item['id']}] {dur_sec:.2f}s ({dur_frames}f) | Frame {item['startFrame']} -> {end_frame} | text: \"{item['text']}\"")
            return
        except Exception as e:
            print(f"[{item['id']}] Attempt {attempt+1} failed: {e}. Retrying in 2s...")
            await asyncio.sleep(2)
    raise RuntimeError(f"Failed to generate {item['id']}")

async def generate_all():
    for item in SCENES:
        await generate_single(item)
        await asyncio.sleep(0.5)

if __name__ == "__main__":
    asyncio.run(generate_all())
