import re
import os
import subprocess
import urllib.request
import ssl

def main():
    works_path = 'src/pages/Works.tsx'
    public_dir = 'public/works_videos'

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    with open(works_path, 'r') as f:
        content = f.read()

    drive_links = re.findall(r"video:\s*'https://drive\.google\.com/file/d/([^/]+)/preview'", content)
    
    if not drive_links:
        print("No Google Drive links left!")
        return

    print(f"Found {len(set(drive_links))} failed Google Drive videos to retry.")
    new_content = content

    for drive_id in set(drive_links):
        print(f"\nRetrying {drive_id}...")
        try:
            url = f"https://drive.google.com/uc?export=download&id={drive_id}"
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
            
            uuid_match = re.search(r'name="uuid" value="([^"]+)"', html)
            confirm_match = re.search(r'name="confirm" value="([^"]+)"', html)
            
            if not uuid_match:
                print("Could not find uuid! Skipping.")
                continue
                
            uuid = uuid_match.group(1)
            confirm = confirm_match.group(1) if confirm_match else 't'
            
            download_url = f"https://drive.usercontent.google.com/download?id={drive_id}&export=download&confirm={confirm}&uuid={uuid}"
            
            temp_file = f"/tmp/vid_{drive_id}.mp4"
            out_file = f"{public_dir}/{drive_id}.mp4"
            
            print(f"  Downloading actual file (uuid={uuid})...")
            subprocess.run(["curl", "-L", "-s", "-o", temp_file, download_url], check=True)
            
            print("  Compressing...")
            subprocess.run([
                "ffmpeg", "-i", temp_file,
                "-vcodec", "libx264", "-b:v", "800k", "-maxrate", "1000k", "-bufsize", "2000k",
                "-preset", "veryfast", "-acodec", "aac", "-b:a", "96k", "-vf", "scale=-2:720",
                "-movflags", "+faststart", "-y", out_file
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            old_str = f"https://drive.google.com/file/d/{drive_id}/preview"
            new_str = f"/works_videos/{drive_id}.mp4"
            new_content = new_content.replace(old_str, new_str)
            print("  Success!")
        except Exception as e:
            print("  Failed again:", e)

        try: os.remove(temp_file)
        except: pass

    with open(works_path, 'w') as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
