import os
import subprocess
import sys
import glob

def compress_video(input_path, output_path, target_bitrate="1000k"):
    """
    Compresses a video using FFmpeg to make it web-friendly.
    """
    command = [
        "ffmpeg",
        "-i", input_path,
        "-vcodec", "libx264",
        "-b:v", target_bitrate,
        "-acodec", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "-y", # Overwrite output file if it exists
        output_path
    ]
    
    print(f"Compressing {input_path} -> {output_path}...")
    try:
        subprocess.run(command, check=True)
        print(f"✅ Successfully compressed: {output_path}")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error compressing {input_path}: {e}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/compress_video.py <input_directory_or_file>")
        print("Example: python scripts/compress_video.py my_videos/")
        sys.exit(1)

    target = sys.argv[1]

    if os.path.isfile(target):
        # Single file
        name, ext = os.path.splitext(target)
        output = f"{name}_compressed.mp4"
        compress_video(target, output)
    
    elif os.path.isdir(target):
        # Directory
        os.makedirs(os.path.join(target, "compressed"), exist_ok=True)
        videos = glob.glob(os.path.join(target, "*.mp4")) + glob.glob(os.path.join(target, "*.mov"))
        
        if not videos:
            print(f"No .mp4 or .mov videos found in {target}")
            return
            
        for video in videos:
            filename = os.path.basename(video)
            name, ext = os.path.splitext(filename)
            output = os.path.join(target, "compressed", f"{name}_compressed.mp4")
            compress_video(video, output)
    else:
        print(f"Invalid path: {target}")

if __name__ == "__main__":
    main()
