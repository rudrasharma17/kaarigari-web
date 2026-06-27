import urllib.request
import ssl
import subprocess
import os
import re
import argparse
import sys

# Disable SSL verification for Drive downloads
ssl._create_default_https_context = ssl._create_unverified_context

def main():
    parser = argparse.ArgumentParser(description="Download and compress a portfolio video from Google Drive.")
    parser.add_argument("--id", required=True, help="Google Drive File ID of the video")
    parser.add_argument("--num", type=int, required=True, help="Project number (e.g., 15 for project-15.mp4)")
    
    args = parser.parse_args()
    
    file_id = args.id
    proj_num = args.num
    
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "portfolio")
    os.makedirs(out_dir, exist_ok=True)
    
    out_file = os.path.join(out_dir, f"project-{proj_num}.mp4")
    tmp_file = os.path.join(out_dir, f"tmp-{proj_num}.mp4")
    
    # Check if target file already exists
    if os.path.exists(out_file):
        confirm = input(f"Warning: {out_file} already exists. Overwrite? (y/n): ")
        if confirm.lower() != 'y':
            print("Aborted.")
            sys.exit(0)
            
    print(f"\n1. Downloading video with ID: {file_id} ...")
    url = f"https://drive.usercontent.google.com/download?id={file_id}&export=download"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            content = response.read()
            content_str = content.decode('utf-8', errors='ignore')
            
            # Check for virus scan warning page (usually shown for files > 100MB)
            if "Virus scan warning" in content_str:
                print("Large file warning detected. Retrieving confirmation keys...")
                confirm_match = re.search(r'name="confirm"\s+value="([^"]+)"', content_str)
                uuid_match = re.search(r'name="uuid"\s+value="([^"]+)"', content_str)
                
                confirm_val = confirm_match.group(1) if confirm_match else "t"
                uuid_val = uuid_match.group(1) if uuid_match else ""
                
                dl_url = f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm={confirm_val}"
                if uuid_val:
                    dl_url += f"&uuid={uuid_val}"
                    
                print("Re-requesting download bypass...")
                dl_req = urllib.request.Request(dl_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(dl_req) as dl_resp:
                    with open(tmp_file, 'wb') as f:
                        f.write(dl_resp.read())
            else:
                with open(tmp_file, 'wb') as f:
                    f.write(content)
                    
        dl_size = os.path.getsize(tmp_file) / 1024 / 1024
        print(f"✓ Download complete. Raw Size: {dl_size:.2f} MB")
    except Exception as e:
        print(f"✗ Download failed: {e}")
        if os.path.exists(tmp_file):
            os.remove(tmp_file)
        sys.exit(1)
        
    print("\n2. Compressing using ffmpeg for web streaming and iOS/Safari compatibility...")
    cmd = [
        "ffmpeg", "-y", "-i", tmp_file,
        "-vf", "scale=-2:720",          # Scale height to 720p, keep even width aspect ratio
        "-vcodec", "libx264",           # Web-compatible H.264 codec
        "-pix_fmt", "yuv420p",          # Required for Safari/iOS compatibility
        "-crf", "28",                   # Good balance of file size & quality
        "-preset", "medium",            # Compression balance
        "-acodec", "aac",               # Standard web audio
        "-b:a", "128k",
        "-movflags", "+faststart",      # Put index at start for instant video streaming
        out_file
    ]
    
    try:
        # Run command and show ffmpeg logs
        subprocess.run(cmd, check=True)
        out_size = os.path.getsize(out_file) / 1024 / 1024
        print(f"\n✓ Compression complete!")
        print(f"  - Saved to: public/portfolio/project-{proj_num}.mp4")
        print(f"  - Compressed Size: {out_size:.2f} MB")
        print(f"  - Space saved: {dl_size - out_size:.2f} MB")
    except FileNotFoundError:
        print("✗ Error: ffmpeg command not found. Please ensure ffmpeg is installed and added to your system PATH.")
    except Exception as e:
        print(f"✗ Compression failed: {e}")
    finally:
        # Clean up temp file
        if os.path.exists(tmp_file):
            os.remove(tmp_file)

if __name__ == "__main__":
    main()
