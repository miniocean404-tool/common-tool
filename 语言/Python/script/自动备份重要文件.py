import shutil
import datetime
import os

def backup_files(source, destination):
    today = datetime.datetime.now().strftime("%Y%m%d")
    dest_dir = os.path.join(destination, f"backup_{today}")

    try:
        shutil.copytree(source, dest_dir)
        print(f"备份成功完成 {dest_dir}")
    except FileExistsError:
        print(f"{today} 的备份已经存在")

backup_files(r'C:\ImportantFiles', r'D:\Backups')
