from fastapi import UploadFile, File, APIRouter

router = APIRouter()


@router.post("/analyse_pdf")
def upload_file(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open(file.filename, "wb") as fp:
            fp.write(contents)
    except Exception:
        return {"message": "Error with uploading the file"}
    finally:
        file.file.close()
    return {"message": "Successfully uploaded the pdf"}
