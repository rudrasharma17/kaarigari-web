import re
import os
import subprocess
import urllib.request
import sys

def main():
    works_path = 'src/pages/Works.tsx'
    public_dir = 'public/works_videos'
    os.makedirs(public_dir, exist_ok=True)

    with open(works_path, 'r') as f:
        content = f.read()

    # Find all Drive preview links
    drive_links = re.findall(r"video:\s*'https://drive\.google\.com/file/d/([^/]+)/preview'", content)
    
    if not drive_links:
        print("No Google Drive links found.")
        return

    print(f"Found {len(drive_links)} Google Drive videos to process.")

    new_content = content

    for idx, drive_id in enumerate(set(drive_links)):
        print(f"\n[{idx+1}/{len(set(drive_links))}] Processing {drive_id}...")
        download_url = f"https://drive.google.com/uc?export=download&id={drive_id}"
        temp_file = f"/tmp/vid_{drive_id}.mp4"
        out_file = f"{public_dir}/{drive_id}.mp4"

        # Download
        print("  Downloading...")
        try:
            subprocess.run(["curl", "-L", "-s", "-o", temp_file, download_url], check=True)
        except Exception as e:
            print("  Download failed:", e)
            continue

        # Compress
        print("  Compressing...")
        try:
            subprocess.run([
                "ffmpeg", "-i", temp_file,
                "-vcodec", "libx264",
                "-b:v", "800k",
                "-maxrate", "1000k",
                "-bufsize", "2000k",
                "-preset", "veryfast",
                "-acodec", "aac",
                "-b:a", "96k",
                "-vf", "scale=-2:720",
                "-movflags", "+faststart",
                "-y", out_file
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print("  Successfully compressed.")
        except Exception as e:
            print("  Compression failed:", e)
            continue

        # Replace in Works.tsx
        old_str = f"https://drive.google.com/file/d/{drive_id}/preview"
        new_str = f"/works_videos/{drive_id}.mp4"
        new_content = new_content.replace(old_str, new_str)
        
        # Also clean up tmp file
        try:
            os.remove(temp_file)
        except:
            pass

    with open(works_path, 'w') as f:
        f.write(new_content)

    print("\n✅ Done! Updated Works.tsx with local compressed video paths.")

if __name__ == "__main__":
    main()
