import gdown

folder_url = 'https://drive.google.com/drive/folders/1KPTsv3wXs5ui-TfX1KECFUJrAnG7cF6F'
res = gdown.download_folder(url=folder_url, skip_download=True, quiet=True)

for file in res:
    print(file.id, file.path)
