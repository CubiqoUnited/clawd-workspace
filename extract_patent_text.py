import sys
import os
from pathlib import Path

# Add the media inbound directory
media_dir = r"C:\Users\avloy\.clawdbot\media\inbound"
pdf_path = os.path.join(media_dir, "5be320fb-fa72-4039-bde6-e04b7be0c7d2.pdf")
docx_path = os.path.join(media_dir, "037a94fb-e37b-4d93-a234-0ef309e0c30e.docx")

print("=== Analyzing Provisional Patent Documents ===")
print(f"PDF: {pdf_path} (exists: {os.path.exists(pdf_path)})")
print(f"DOCX: {docx_path} (exists: {os.path.exists(docx_path)})")
print()

# Try to get basic file info
try:
    pdf_size = os.path.getsize(pdf_path)
    docx_size = os.path.getsize(docx_path)
    print(f"PDF size: {pdf_size} bytes ({pdf_size/1024:.1f} KB)")
    print(f"DOCX size: {docx_size} bytes ({docx_size/1024:.1f} KB)")
    print()
    
    # Try to extract some text with basic methods
    print("Attempting to extract text from PDF...")
    try:
        # Simple binary analysis for PDF
        with open(pdf_path, 'rb') as f:
            pdf_data = f.read(5000)  # Read first 5KB
            # Look for text patterns
            text_patterns = [b'Patent', b'Provisional', b'Application', b'USPTO', b'Title', b'Abstract', b'Claims']
            for pattern in text_patterns:
                if pattern in pdf_data:
                    print(f"  Found pattern: {pattern.decode('utf-8', errors='ignore')}")
    except Exception as e:
        print(f"  PDF read error: {e}")
    
    print("\nAttempting to extract text from DOCX...")
    try:
        # DOCX is a zip file, try to read it
        import zipfile
        with zipfile.ZipFile(docx_path, 'r') as docx:
            # Look for document.xml
            if 'word/document.xml' in docx.namelist():
                xml_content = docx.read('word/document.xml')
                # Extract some text (first 2000 chars)
                xml_str = xml_content.decode('utf-8', errors='ignore')
                # Simple text extraction between tags
                import re
                text_matches = re.findall(r'>([^<]+)<', xml_str)
                extracted_text = ' '.join(text_matches)[:1000]
                print(f"  Extracted text preview (first 1000 chars):")
                print(f"  {extracted_text[:200]}...")
    except Exception as e:
        print(f"  DOCX read error: {e}")
        
except Exception as e:
    print(f"Error analyzing files: {e}")

print("\n=== Recommendations ===")
print("Based on file sizes and formats:")
print("1. PDF (658KB): Likely complete provisional patent application")
print("2. DOCX (30KB): Likely cover sheet, claims, or summary")
print("\nNext steps for patent agents:")
print("1. Analyze provisional filing date and number")
print("2. Review claims and disclosure")
print("3. Plan non-provisional conversion strategy")
print("4. Identify prior art cited")
print("5. Prepare for USPTO examination")