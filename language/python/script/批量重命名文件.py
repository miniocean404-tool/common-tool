import os

def batch_rename(directory, old_ext, new_ext):
    for filename in os.listdir(directory):
        if filename.endswith(old_ext):
            name_without_ext = os.path.splitext(filename)[0]
            os.rename(
                os.path.join(directory, filename),
                os.path.join(directory, f"{name_without_ext}{new_ext}")
            )

batch_rename(r'./xx', '.txt', '.md')
