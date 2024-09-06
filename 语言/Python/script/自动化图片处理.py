# 批量调整图片大小,同时保持原始宽高比

from PIL import Image
import os

def batch_resize_images(input_folder, output_folder, size):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            with Image.open(os.path.join(input_folder, filename)) as img:
                img.thumbnail(size)
                img.save(os.path.join(output_folder, filename))

batch_resize_images('original_images', 'resized_images', (300, 300))
