from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def home(request):
    return HttpResponse("medicine")

import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import easyocr
import fitz
from PIL import Image
import io
import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import google.generativeai as genai
from django.conf import settings

genai.configure(api_key=settings.GENERATIVE_AI_API_KEY)

MODEL_PATH = os.path.join(settings.BASE_DIR, 'Blue_model')
TFIDF_VECTORIZER_PATH = os.path.join(MODEL_PATH, 'tfidf_vectorizer_updated.pkl')
MEDICINE_TFIDF_PATH = os.path.join(MODEL_PATH, 'medicine_tfidf_updated.pkl')
MEDICINE_DATASET_PATH = os.path.join(MODEL_PATH, 'medicine_dataset.csv')

df = pd.read_csv(MEDICINE_DATASET_PATH, low_memory=False)

with open(TFIDF_VECTORIZER_PATH, "rb") as file:
    tfidf_vectorizer = pickle.load(file)

with open(MEDICINE_TFIDF_PATH, "rb") as file:
    medicine_tfidf = pickle.load(file)

LANGUAGES = {
    "en": "English",
    "ch": "Chinese",
    "fr": "French",
    "de": "German",
    "ko": "Korean",
    "ja": "Japanese",
    "hi": "Hindi (Devanagari)"
}

def extract_text_from_pdf(pdf_path):
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Error opening PDF: {e}")
        return "Error: Cannot open the PDF file."

    extracted_text = ""
    reader = easyocr.Reader(["en"])

    for page_number in range(len(doc)):
        text = doc[page_number].get_text("text")
        extracted_text += f"\n--- Page {page_number+1} (Selectable Text) ---\n{text}\n"

        if not text.strip():
            for img_index, img in enumerate(doc[page_number].get_images(full=True)):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                img = Image.open(io.BytesIO(image_bytes))

                results = reader.readtext(image_bytes)
                text = "\n".join([result[1] for result in results])

                extracted_text += f"\n--- Page {page_number+1} (Image OCR) ---\n{text}\n"

    return extracted_text.strip()

def get_c_m(extracted_text):
    prompt = f"Following paragraph is a text from a medical prescription. Extract the names of medicines (e.g., syrup, tablet, injection, etc.). \n\n{extracted_text}"

    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content(prompt)

        if response and hasattr(response, "text"):
            medicines = response.text.strip()
            print("Medicines in the given file:", medicines)
            return medicines.split(",")
        else:
            return "No medicines found."
    except Exception as e:
        print(f"Error in Gemini API: {e}")
        return "Error in medicine extraction."

@csrf_exempt
def process_ocr(request):
    if request.method == 'POST':
        try:
            # Check if a file is uploaded
            if 'file' not in request.FILES:
                return JsonResponse({"error": "No file uploaded"}, status=400)

            uploaded_file = request.FILES['file']
            lang = request.POST.get('language', 'en')  # Default to English if not provided

            # Save the file temporarily
            fs = FileSystemStorage()
            filename = fs.save(uploaded_file.name, uploaded_file)
            file_path = os.path.join(fs.location, filename)

            extracted_text = ""

            # Extract text from PDF or image
            if filename.lower().endswith('.pdf'):
                extracted_text = extract_text_from_pdf(file_path)
            else:
                reader = easyocr.Reader([lang])
                results = reader.readtext(file_path)
                extracted_text = "\n".join([result[1] for result in results])

            # Get medicine names from extracted text
            medicines = get_c_m(extracted_text)

            if medicines == "No medicines found.":
                return JsonResponse({"error": "No medicines found in the file"}, status=404)

            # Find closest medicines and substitutes
            closest_med = []
            for medicine in medicines:
                vec = tfidf_vectorizer.transform([medicine.lower()])
                cs = cosine_similarity(vec, medicine_tfidf).flatten()
                top_indices = cs.argsort()[-3:][::-1]

                for idx in top_indices:
                    medicinename = df.iloc[idx]['name']
                    substitutes = df.iloc[idx][['substitute0', 'substitute1', 'substitute2', 'substitute3', 'substitute4']].dropna().tolist()

                    closest_med.append({
                        'medicine': medicinename,
                        'substitutes': substitutes if substitutes else 'No substitutes available'
                    })

            # Clean up: Delete the temporary file
            fs.delete(filename)

            # Return JSON response
            return JsonResponse({
                'extracted_text': extracted_text,
                'medicines': closest_med
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)





# from django.shortcuts import render
# from django.http import HttpResponse
# from django.core.files.storage import FileSystemStorage
# import easyocr
# import os
# import fitz  
# import pytesseract
# import io
# from PIL import Image



# import pickle
# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# from django.shortcuts import render
# from django.http import JsonResponse
# import os
# from django.core.files.storage import FileSystemStorage
# import easyocr
# from django.conf import settings
# import google.generativeai as genai
# from PIL import Image

# genai.configure(api_key=settings.GENERATIVE_AI_API_KEY)

# MODEL_PATH = os.path.join(settings.BASE_DIR, 'Blue_model')

# TFIDF_VECTORIZER_PATH = os.path.join(MODEL_PATH, 'tfidf_vectorizer_updated.pkl')
# MEDICINE_TFIDF_PATH = os.path.join(MODEL_PATH, 'medicine_tfidf_updated.pkl')
# MEDICINE_DATASET_PATH = os.path.join(MODEL_PATH, 'medicine_dataset.csv')

# df = pd.read_csv(MEDICINE_DATASET_PATH, low_memory=False)

# with open(TFIDF_VECTORIZER_PATH, "rb") as file:
#     tfidf_vectorizer = pickle.load(file)

# with open(MEDICINE_TFIDF_PATH, "rb") as file:
#     medicine_tfidf = pickle.load(file)

# LANGUAGES = {
#     "en": "English",
#     "ch": "Chinese",
#     "fr": "French",
#     "de": "German",
#     "ko": "Korean",
#     "ja": "Japanese",
#     "hi": "Hindi (Devanagari)"
# }

# def extract_text_from_pdf(pdf_path):
#     try:
#         doc = fitz.open(pdf_path)
#     except Exception as e:
#         print(f"error in opening PDF: {e}")
#         return "errorcan't open ur pdf."

#     extracted_text = ""
#     reader = easyocr.Reader(["en"])  

#     for page_number in range(len(doc)):
  
#         text = doc[page_number].get_text("text")
#         extracted_text += f"\n--- Page {page_number+1} (Selectable Text) ---\n{text}\n"
 
#         if not text.strip():  
#             for img_index, img in enumerate(doc[page_number].get_images(full=True)):
#                 xref = img[0]
#                 base_image = doc.extract_image(xref)
#                 image_bytes = base_image["image"]
#                 img = Image.open(io.BytesIO(image_bytes))
 
#                 results = reader.readtext(image_bytes)
#                 text = "\n".join([result[1] for result in results])

#                 extracted_text += f"\n--- Page {page_number+1} (Image OCR) ---\n{text}\n"

#     return extracted_text.strip()

# def get_c_m(extracted_text): # get closest medicines
  
#     prompt = f"Following paragraph is a text from medical prescription, out of all the text just provide the names of medicines, it can be syrup, tablet, injection etc. \n\n{extracted_text}"

#     try:
#         model = genai.GenerativeModel("gemini-1.5-pro-latest")
#         response = model.generate_content(prompt)

#         if response and hasattr(response, "text"):
#             medicines = response.text.strip()
#             print("meds in given file :", medicines)
#             return medicines.split(",")   
#         else:
#             return "oh no ! no med!"
#     except Exception as e:
#         print(f"error by gemini : {e}")
#         return "error in med extract"

# def process_ocr(request):
#     if request.method == 'POST':

#         if 'image' in request.FILES:
#             uploaded_file = request.FILES['image']
#             print("file_name :", uploaded_file.name)

#             fs = FileSystemStorage()
#             filename = fs.save(uploaded_file.name, uploaded_file)
#             file_url = fs.url(filename)
#             file_path = os.path.join(fs.location, filename)

#             lang = request.POST.get('language', 'en')
#             print("img :", lang)

#             extracted_text = "" 

#             if filename.lower().endswith('.pdf'):
#                 extracted_text = extract_text_from_pdf(file_path)
#             else:
#                 reader = easyocr.Reader([lang])
#                 results = reader.readtext(file_path)
#                 extracted_text = "\n".join([result[1] for result in results])


#             medicines = get_c_m(extracted_text)

#             if medicines == "oh no ! no med!":
#                 return JsonResponse({"error": "oh no ! no med!"}, status=404)

#             closest_med = []

#             for medicine in medicines:
#                 vec = tfidf_vectorizer.transform([medicine.lower()])
#                 cs = cosine_similarity(vec, medicine_tfidf).flatten()
#                 top_indices = cs.argsort()[-3:][::-1]

#                 for idx in top_indices:
#                     medicinename = df.iloc[idx]['name']
#                     substitutes = df.iloc[idx][['substitute0', 'substitute1', 'substitute2', 'substitute3', 'substitute4']].dropna().tolist()

#                     closest_med.append({
#                         'medicine': medicinename,
#                         'substitutes': substitutes if substitutes else 'none other substitutes present'
#                     })

#             return render(request, 'result.html', {
#                 'file_url': file_url,
#                 'extracted_text': extracted_text,
#                 'medicines': closest_med
#             })

#         else:
#             print("No file")
#             return HttpResponse("Error: No file uploaded", status=400)

#     return render(request, 'index.html', {'languages': LANGUAGES})


# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json

# @csrf_exempt  # Disable CSRF for this endpoint (for testing purposes)
# def process_ocrendpoint(request):
#     if request.method == 'POST':
#         try:
#             # Parse JSON data from the request body
#             data = json.loads(request.body)
#             file_data = data.get('file_data')  # Base64 encoded file data
#             file_name = data.get('file_name')  # File name
#             lang = data.get('language', 'en')  # Language (default: English)

#             if not file_data or not file_name:
#                 return JsonResponse({"error": "No file data or file name provided"}, status=400)

#             # Save the file temporarily
#             fs = FileSystemStorage()
#             file_path = fs.save(file_name, file_data)
#             file_url = fs.url(file_path)
#             file_path = os.path.join(fs.location, file_name)

#             extracted_text = ""

#             # Extract text from PDF or image
#             if file_name.lower().endswith('.pdf'):
#                 extracted_text = extract_text_from_pdf(file_path)
#             else:
#                 reader = easyocr.Reader([lang])
#                 results = reader.readtext(file_path)
#                 extracted_text = "\n".join([result[1] for result in results])

#             # Get medicine names from extracted text
#             medicines = get_c_m(extracted_text)

#             if medicines == "oh no ! no med!":
#                 return JsonResponse({"error": "No medicines found in the file"}, status=404)

#             # Find closest medicines and substitutes
#             closest_med = []
#             for medicine in medicines:
#                 vec = tfidf_vectorizer.transform([medicine.lower()])
#                 cs = cosine_similarity(vec, medicine_tfidf).flatten()
#                 top_indices = cs.argsort()[-3:][::-1]

#                 for idx in top_indices:
#                     medicinename = df.iloc[idx]['name']
#                     substitutes = df.iloc[idx][['substitute0', 'substitute1', 'substitute2', 'substitute3', 'substitute4']].dropna().tolist()

#                     closest_med.append({
#                         'medicine': medicinename,
#                         'substitutes': substitutes if substitutes else 'No substitutes available'
#                     })

#             # Return JSON response
#             return JsonResponse({
#                 'file_url': file_url,
#                 'extracted_text': extracted_text,
#                 'medicines': closest_med
#             })

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)

#     return JsonResponse({"error": "Only POST requests are allowed"}, status=405)