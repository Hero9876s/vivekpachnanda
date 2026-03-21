import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text(path):
    try:
        namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        with zipfile.ZipFile(path) as docx:
            if 'word/document.xml' in docx.namelist():
                tree = ET.fromstring(docx.read('word/document.xml'))
            else:
                return "word/document.xml not found."
        paragraphs = []
        for p in tree.iterfind('.//w:p', namespaces):
            texts = [node.text for node in p.iterfind('.//w:r/w:t', namespaces) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
        return '\n'.join(paragraphs)
    except Exception as e:
        return str(e)

file_path = "Vivek cvv1 (1) (1).docx"
output_path = "cv_extracted.txt"
text = extract_text(file_path)

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(text)
print(f"Extracted to {output_path}")
