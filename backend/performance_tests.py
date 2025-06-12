from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

# Setup Chrome with options
chrome_options = Options()
# Optional: run in headless mode (no UI)
# chrome_options.add_argument("--headless")

# Setup the service properly
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# === Performance Tests ===

def test_image_upload(file_path):
    driver.get("http://localhost:5173")  # Replace with your frontend URL
    driver.find_element(By.CSS_SELECTOR, '[data-cy="upload-btn"]').click()
    
    start = time.time()
    driver.find_element(By.CSS_SELECTOR, '[data-cy="file-input"]').send_keys(file_path)
    
    driver.implicitly_wait(10)
    driver.find_element(By.CSS_SELECTOR, '[data-cy="pay-button"]')  # Confirm button appears
    end = time.time()
    
    print(f"[Upload] Time for {file_path}: {end - start:.2f}s")

def test_pdf_generation():
    driver.get("http://localhost:5173/analysis-result")  # Update with real route
    driver.find_element(By.ID, "generate-pdf").click()
    
    start = time.time()
    driver.implicitly_wait(10)
    driver.find_element(By.ID, "pdf-ready")  # Assume this appears when PDF is ready
    end = time.time()
    
    print(f"[PDF] Generation time: {end - start:.2f}s")

def test_first_paint():
    driver.get("http://localhost:5173")
    paint = driver.execute_script("return performance.getEntriesByType('paint')")
    
    for p in paint:
        print(f"[Paint] {p['name']}: {p['startTime']:.2f}ms")

def run_all_tests():
    print("=== Performance Test Report ===")
    
    test_image_upload("./Test_img/small.jpg")
    test_image_upload("./Test_img/medium.jpg")
    test_image_upload("./Test_img/large.png")
    
    test_pdf_generation()
    test_first_paint()
    
    print("=== All tests done ===")

# Run all
run_all_tests()
driver.quit()
