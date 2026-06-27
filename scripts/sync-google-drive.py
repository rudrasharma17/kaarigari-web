import re

def main():
    works_path = 'src/pages/Works.tsx'
    with open(works_path, 'r') as f:
        content = f.read()

    def replace_video_url(match):
        thumb_id = match.group(1)
        return f"thumb: 'https://drive.google.com/thumbnail?id={thumb_id}&sz=w400',\n    video: 'https://drive.google.com/file/d/{thumb_id}/preview'"

    new_content = re.sub(
        
        r"thumb:\s*'https://drive\.google\.com/thumbnail\?id=([^&]+)&sz=w400',\n\s*video:\s*'[A-Za-z0-9/.-]+'",
        replace_video_url,
        content
    )

    modal_replacement = """                <iframe
                  src={sel.video}
                  className="w-full h-full object-contain bg-black"
                  allow="autoplay; fullscreen"
                  style={{ border: 'none' }}
                />"""
    
    video_tag_pattern = r"<\s*video\s+src=\{sel\.video\}[^>]+>"
    
    new_content = re.sub(video_tag_pattern, modal_replacement, new_content, flags=re.DOTALL)

    with open(works_path, 'w') as f:
        f.write(new_content)

    print("Successfully updated Works.tsx to stream directly from Google Drive!")

if __name__ == "__main__":
    main()
