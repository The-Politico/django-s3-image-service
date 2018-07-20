from tempfile import NamedTemporaryFile
from PIL import Image


image = Image.new('RGB', (100, 100))
tmp_file = NamedTemporaryFile(suffix='.jpg', delete=False)
image.save(tmp_file, format='JPEG')

test = Image.open(tmp_file)
test.save("test.jpg")
