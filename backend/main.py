from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image, ImageDraw
import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Image as RLImage, Table, TableStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_RIGHT, TA_CENTER, TA_LEFT
from reportlab.lib import colors
from datetime import date
from reportlab.lib.utils import ImageReader

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO('./DL/150epoch/best.pt')

DISEASE_INFO = {
    "Acne": {
        "description": "Acne is a common skin condition occurring when hair follicles become plugged with oil and dead skin cells, leading to whiteheads, blackheads, pimples, or cysts.",
        "symptoms": ["Whiteheads", "Blackheads", "Small red, tender bumps (papules)", "Pimples (pustules)", "Large, painful lumps (nodules/cysts)"],
        "care_tips": ["Wash affected areas twice daily with mild cleanser.", "Avoid harsh scrubbing.", "Use non-comedogenic products.", "Don't pick or squeeze pimples.", "Consult a dermatologist for severe cases."]
    },
    "Atopic Dermatitis": {
        "description": "Atopic dermatitis (eczema) is a chronic inflammatory skin condition causing dry, itchy, and inflamed skin. It often begins in childhood.",
        "symptoms": ["Dry, sensitive skin", "Intense itching", "Red to brownish-gray patches", "Small, raised bumps (may leak fluid)", "Thickened, scaly skin"],
        "care_tips": ["Moisturize regularly with fragrance-free products.", "Avoid triggers (harsh soaps, certain fabrics).", "Take lukewarm baths.", "Avoid scratching.", "Consult a dermatologist for topical treatments."]
    },
    "Chicken Skin": {
        "description": "Chicken skin (Keratosis Pilaris) is a harmless condition causing small, rough bumps on the skin, often on arms, thighs, cheeks, or buttocks. It's caused by a buildup of keratin.",
        "symptoms": ["Small, rough, often red or brown bumps", "Dry skin in affected areas", "Feels like sandpaper"],
        "care_tips": ["Gently exfoliate with a loofah or washcloth.", "Use moisturizers with lactic acid or urea.", "Avoid harsh soaps.", "Limit hot showers.", "Moisturize immediately after showering."]
    },
    "Eczema": {
        "description": "Eczema refers to a group of conditions that cause the skin to become inflamed, itchy, red, cracked, and rough. Atopic dermatitis is the most common type.",
        "symptoms": ["Inflamed, itchy skin", "Redness", "Cracked or rough patches", "Dryness", "Blistering (in acute cases)"],
        "care_tips": ["Identify and avoid irritants.", "Keep skin hydrated.", "Use mild, fragrance-free skin care products.", "Avoid prolonged hot water exposure.", "Consider antihistamines for itching (consult doctor)."]
    },
    "Hansen-s Disease-Leprosy": {
        "description": "Hansen's Disease (Leprosy) is a chronic infectious disease caused by Mycobacterium leprae. It primarily affects the skin, nerves, upper respiratory tract, eyes, and testes. Early detection is key.",
        "symptoms": ["Skin lesions (patches, nodules) with loss of sensation", "Numbness or weakness in hands/feet", "Enlarged nerves", "Eye problems", "Muscle weakness"],
        "care_tips": ["Early diagnosis and multi-drug therapy (MDT) are crucial.", "Follow prescribed treatment regimen precisely.", "Regular medical check-ups to monitor nerve function.", "Protect affected areas from injury due to sensory loss.", "Seek specialized medical care; highly treatable."]
    },
    "Hansen-s Disease-Leprosy- severe": {
        "description": "Severe Hansen's Disease involves widespread skin lesions, more extensive nerve damage, and potentially affects other organs. Requires rigorous and extended multi-drug therapy.",
        "symptoms": ["Extensive skin lesions, nodules, and infiltration", "Significant nerve damage (paralysis, permanent numbness)", "Deformities (hands, feet, face)", "Eye complications (blindness)", "Nasal collapse"],
        "care_tips": ["Strict adherence to extended multi-drug therapy (MDT).", "Regular wound care for trophic ulcers.", "Physical therapy to manage deformities and maintain mobility.", "Eye care to prevent blindness.", "Psychological support.", "Ongoing specialized medical management is essential."]
    },
    "Healthy skin": {
        "description": "Healthy skin is characterized by a smooth texture, even tone, adequate hydration, and an intact barrier function. It is free from active lesions, excessive dryness, or inflammation.",
        "symptoms": ["Smooth and soft texture", "Even skin tone", "Appropriate moisture levels (not overly dry or oily)", "Absence of redness, irritation, or lesions", "Good elasticity"],
        "care_tips": ["Maintain a consistent cleansing and moisturizing routine.", "Use sunscreen daily (SPF 30+).", "Stay hydrated by drinking enough water.", "Eat a balanced diet rich in antioxidants.", "Protect skin from harsh environmental factors.", "Avoid smoking and excessive alcohol consumption."]
    },
    "Psoriasis": {
        "description": "Psoriasis is an autoimmune condition causing rapid skin cell buildup, leading to thick, scaly patches, typically on elbows, knees, scalp, and lower back.",
        "symptoms": ["Red patches with silvery scales (plaques)", "Itching, burning, or soreness", "Dry, cracked skin that may bleed", "Thickened, pitted, or ridged nails", "Swollen and stiff joints (Psoriatic Arthritis)"],
        "care_tips": ["Use moisturizers to soothe and hydrate.", "Avoid triggers like stress, injury, and certain medications.", "Topical treatments (corticosteroids, vitamin D analogs).", "Light therapy (UVB, PUVA) under medical supervision.", "Systemic medications or biologics for severe cases, prescribed by a dermatologist."]
    },
    "Ringworm": {
        "description": "Ringworm (dermatophytosis) is a common fungal infection of the skin, hair, or nails. It typically presents as a red, itchy, circular rash with clearer skin in the center.",
        "symptoms": ["Circular, red, itchy rash", "Scaly skin with raised borders", "Hair loss (on scalp or beard)", "Brittle or discolored nails"],
        "care_tips": ["Keep affected area clean and dry.", "Apply antifungal creams, powders, or sprays (OTC).", "Avoid sharing personal items (towels, clothing).", "Wear loose-fitting clothing.", "For widespread or persistent infections, consult a doctor for oral antifungals."]
    },
    "Warts": {
        "description": "Warts are small, rough growths on the skin caused by the human papillomavirus (HPV). They can appear anywhere on the body, commonly on hands and feet.",
        "symptoms": ["Small, fleshy, grainy bumps", "Rough to the touch", "Often skin-colored, white, pink, or tan", "May have small black dots (clotted blood vessels)"],
        "care_tips": ["Often clear on their own over time.", "Over-the-counter salicylic acid treatments.", "Duct tape occlusion (can be effective for some).", "Avoid picking or scratching to prevent spreading.", "For persistent or bothersome warts, consult a doctor for cryotherapy, laser removal, or minor surgery."]
    }
}


@app.get("/")
def read_root():
    return {"msg": "Deep Learning model API is live!"}

@app.post("/predict-and-generate-report")
async def predict_and_generate_report(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        original_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        results = model(original_image)
        
        if len(results[0].boxes) == 0:
            raise HTTPException(status_code=400, detail="No detection found")
        
        best_box = results[0].boxes[0]
        disease = model.names[int(best_box.cls)]
        confidence = float(best_box.conf) * 100

        annotated_image = original_image.copy()
        draw = ImageDraw.Draw(annotated_image)
        
        x1, y1, x2, y2 = [int(coord) for coord in best_box.xyxy[0]]
        draw.rectangle([x1, y1, x2, y2], outline="red", width=5) 
        
        label_text = f"{disease} ({confidence:.2f}%)"
        text_color = "red"
        
        text_x = x1
        text_y = y1 - 25 
        if text_y < 0: 
            text_y = y1 + 5 

        draw.text((text_x, text_y), label_text, fill=text_color, stroke_fill="white", stroke_width=1)

        disease_data = DISEASE_INFO.get(disease, {
            "description": "No additional information available for this condition. Please consult a medical professional.",
            "symptoms": ["Information not available."],
            "care_tips": ["Information not available."]
        })

        pdf_buffer = io.BytesIO()
        
        left_right_margin = 0.7 * inch
        top_bottom_margin = 0.6 * inch
        
        doc = SimpleDocTemplate(pdf_buffer, 
                                pagesize=letter,
                                rightMargin=left_right_margin,
                                leftMargin=left_right_margin,
                                topMargin=top_bottom_margin,
                                bottomMargin=top_bottom_margin)
        
        styles = getSampleStyleSheet()
        
        styles.add(ParagraphStyle(name='DermaAICheckerTitle', 
                                  fontSize=32, 
                                  fontName='Helvetica-Bold', 
                                  alignment=TA_CENTER, 
                                  spaceAfter=18, 
                                  textColor=colors.darkblue 
                                 ))

        styles.add(ParagraphStyle(name='ReportMainTitle', 
                                  fontSize=18, 
                                  fontName='Helvetica-Bold', 
                                  alignment=TA_CENTER, 
                                  spaceAfter=32, 
                                  textColor=colors.black
                                 ))
        
        styles.add(ParagraphStyle(name='SectionHeading', 
                                  fontSize=14, 
                                  fontName='Helvetica-Bold', 
                                  spaceBefore=12, 
                                  spaceAfter=4, 
                                  textColor=colors.darkgreen 
                                 ))

        styles['BodyText'].fontSize = 12 
        styles['BodyText'].leading = 14 
        styles['BodyText'].alignment = TA_LEFT 
        
        styles.add(ParagraphStyle(name='ListItem', 
                                  parent=styles['BodyText'], 
                                  fontSize=12, 
                                  leading=12, 
                                  leftIndent=15, 
                                  bulletIndent=8, 
                                 ))
        
        styles.add(ParagraphStyle(name='DisclaimerStyle', 
                                  fontSize=8, 
                                  textColor=colors.grey, 
                                  alignment=TA_CENTER, 
                                  spaceBefore=15, 
                                  fontName='Helvetica-Oblique' 
                                 ))

        styles.add(ParagraphStyle(name='FooterDateStyle',
                                  fontSize=9,
                                  alignment=TA_CENTER,
                                  spaceBefore=10,
                                  textColor=colors.grey
                                 ))
        
        # --- NEW STYLE for Contact Info ---
        styles.add(ParagraphStyle(name='ContactInfoStyle',
                                  fontSize=8,
                                  alignment=TA_CENTER,
                                  spaceBefore=5, # Small space after date
                                  textColor=colors.darkgrey,
                                  fontName='Helvetica'
                                 ))


        story = []

        def draw_page_elements(canvas_obj, doc_obj):
            canvas_obj.saveState()
            
            hipaa_logo_path = "./assets/HIPAA_logo-2.png"
            
            # --- Draw Watermark (Background) ---
            try:
                pil_watermark_img = Image.open(hipaa_logo_path).convert("RGBA")
                alpha_channel = pil_watermark_img.getchannel('A')
                new_alpha_channel = Image.eval(alpha_channel, lambda x: x * 0.20)
                pil_watermark_img.putalpha(new_alpha_channel)

                watermark_byte_arr = io.BytesIO()
                pil_watermark_img.save(watermark_byte_arr, format='PNG')
                watermark_byte_arr.seek(0)
                watermark_reader = ImageReader(watermark_byte_arr)

                img_width_orig, img_height_orig = watermark_reader.getSize()
                page_width = doc_obj.pagesize[0]
                page_height = doc_obj.pagesize[1]

                desired_watermark_width = page_width * 0.7 
                watermark_height = img_height_orig * (desired_watermark_width / img_width_orig)

                if watermark_height > page_height * 0.7: 
                    watermark_height = page_height * 0.7
                    desired_watermark_width = img_width_orig * (watermark_height / img_height_orig)

                x_center = (page_width - desired_watermark_width) / 2
                y_center = (page_height - watermark_height) / 2

                canvas_obj.drawImage(watermark_reader, x_center, y_center,
                                     width=desired_watermark_width, height=watermark_height,
                                     mask='auto')

            except FileNotFoundError:
                canvas_obj.setFont('Helvetica-Oblique', 8)
                canvas_obj.setFillColor(colors.red)
                canvas_obj.drawString(doc_obj.pagesize[0] / 2 - 1.5*inch, doc_obj.pagesize[1] / 2, "Watermark Image Missing!")
            except Exception as e:
                canvas_obj.setFont('Helvetica-Oblique', 8)
                canvas_obj.setFillColor(colors.red)
                canvas_obj.drawString(doc_obj.pagesize[0] / 2 - 1.5*inch, doc_obj.pagesize[1] / 2, f"Watermark Error: {str(e)}")

            # --- Draw Border ---
            border_margin = 0.3 * inch
            canvas_obj.setStrokeColor(colors.lightgrey)
            canvas_obj.setLineWidth(1)
            canvas_obj.rect(border_margin, border_margin, 
                            doc_obj.pagesize[0] - 2 * border_margin, 
                            doc_obj.pagesize[1] - 2 * border_margin)
            
            # --- Place HIPAA Logo (Top Right) ---
        doc.build(story, onFirstPage=draw_page_elements, onLaterPages=draw_page_elements)
        story = [] 

        story.append(Paragraph("AI Derma Checker", styles['DermaAICheckerTitle']))
        story.append(Spacer(1, 0.15 * inch)) 

        story.append(Paragraph("Skin Disease Detection Report", styles['ReportMainTitle']))
        story.append(Spacer(1, 0.25 * inch)) 

        img_width, img_height = annotated_image.size
        
        max_display_width = 3.5 * inch 
        max_display_height = 3.5 * inch 

        scale_factor_width = max_display_width / img_width
        scale_factor_height = max_display_height / img_height
        
        scale_factor = min(scale_factor_width, scale_factor_height, 1) 

        final_img_width = img_width * scale_factor
        final_img_height = img_height * scale_factor

        img_byte_arr = io.BytesIO()
        annotated_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        rl_image = RLImage(img_byte_arr, width=final_img_width, height=final_img_height)

        prediction_content = []
        prediction_content.append(Paragraph(f"<b>Disease Detected:</b> <font color='red'>{disease}</font>", styles["BodyText"]))
        prediction_content.append(Paragraph(f"<b>Confidence:</b> {confidence:.2f}%", styles["BodyText"]))
        prediction_content.append(Spacer(1, 0.08 * inch)) 
        
        description_text = disease_data["description"]
        prediction_content.append(Paragraph("<b>Description:</b>", styles["SectionHeading"]))
        prediction_content.append(Paragraph(description_text, styles["BodyText"]))
        prediction_content.append(Spacer(1, 0.08 * inch)) 
        
        if disease_data["symptoms"]:
            prediction_content.append(Paragraph("<b>Symptoms:</b>", styles["SectionHeading"]))
            for symptom in disease_data["symptoms"]:
                prediction_content.append(Paragraph(f"• {symptom}", styles["ListItem"]))
            prediction_content.append(Spacer(1, 0.08 * inch)) 
        
        if disease_data["care_tips"]:
            prediction_content.append(Paragraph("<b>Care Tips:</b>", styles["SectionHeading"]))
            for tip in disease_data["care_tips"]:
                prediction_content.append(Paragraph(f"• {tip}", styles["ListItem"]))
            prediction_content.append(Spacer(1, 0.08 * inch)) 

        # --- Adjusted text_col_width to use more space ---
        text_col_width = None # Let ReportLab auto-calculate to fill remaining space
        image_col_width = final_img_width 
        
        table_data = [
            [prediction_content, rl_image]
        ]
        
        report_table = Table(table_data, colWidths=[text_col_width, image_col_width])
        report_table.setStyle(TableStyle([
            ('ALIGN', (0,0), (0,0), 'LEFT'),  
            ('ALIGN', (1,0), (1,0), 'RIGHT'), 
            ('VALIGN', (0,0), (-1,-1), 'TOP'), 
            ('LEFTPADDING', (1,0), (1,0), 0.15 * inch), 
            ('BOTTOMPADDING', (0,0), (-1,-1), 0.1 * inch),
        ]))

        story.append(report_table)
        story.append(Spacer(1, 0.15 * inch)) 


        story.append(Paragraph(
            "<i>Disclaimer: This report is AI-generated and not a substitute for professional medical advice. Always consult a medical professional for diagnosis and treatment.</i>",
            styles['DisclaimerStyle']
        ))

        report_date_str = date.today().strftime("%B %d, %Y")
        story.append(Paragraph(f"Report Generated: {report_date_str}", styles['FooterDateStyle']))
        
        # --- NEW: Contact/Support Information ---
        # Define your contact details here
        contact_email = "dr.rafia@gmail.com" # Replace with your email
        contact_phone = "+123 456 7890" # Replace with your phone number
        contact_location = "123 Health Ave, Rawalpindi, Pakistan" # Replace with your location

        story.append(Paragraph(
            f"For support and assistance, please contact us:",
            styles['ContactInfoStyle']
        ))
        story.append(Paragraph(
            f"Email: {contact_email} | Phone: {contact_phone} | Location: {contact_location}",
            styles['ContactInfoStyle']
        ))
        story.append(Spacer(1, 0.05 * inch)) # Small space at very bottom


        doc.build(story, onFirstPage=draw_page_elements, onLaterPages=draw_page_elements)
        pdf_buffer.seek(0)

        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=skin_report_{disease}.pdf"
            }
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")