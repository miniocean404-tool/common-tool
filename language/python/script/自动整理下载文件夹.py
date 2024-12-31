import os
import shutil

def organize_downloads(path):
    for filename in os.listdir(path):
        name, extension = os.path.splitext(filename)
        extension = extension[1:]

        if extension == "py":
            return

        if os.path.exists(path + '/' + extension):
            shutil.move(path + '/' + filename, path + '/' + extension + '/' + filename)
        else:
            os.makedirs(path + '/' + extension)
            shutil.move(path + '/' + filename, path + '/' + extension + '/' + filename)

organize_downloads(r'./')
