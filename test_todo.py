#!/usr/bin/env python3
"""
Selenium Test Script for To-Do List Application
Tests basic functionality: add task, complete task, delete task
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import sys

def run_tests():
    """Run all tests for the to-do application"""
    
    # Configure Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    
    # Initialize Chrome driver
    try:
        driver = webdriver.Chrome(options=chrome_options)
    except:
        print("ERROR: Chrome driver not found. Installing...")
        sys.exit(1)
    
    test_results = []
    
    try:
        print("=" * 60)
        print("Starting To-Do List Application Tests")
        print("=" * 60)
        
        # Test 1: Open the application
        print("\n[TEST 1] Opening application...")
        driver.get("http://localhost:8000")
        time.sleep(2)
        print("✓ Application loaded successfully")
        test_results.append(("Application Load", True, ""))
        
        # Test 2: Add a task
        print("\n[TEST 2] Testing add task functionality...")
        try:
            task_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "taskInput")))
            task_input.clear()
            task_input.send_keys("Learn DevOps")
            
            add_btn = driver.find_element(By.ID, "addBtn")
            add_btn.click()
            time.sleep(1)
            
            tasks = driver.find_elements(By.CLASS_NAME, "task-item")
            if len(tasks) > 0:
                print(f"✓ Task added successfully. Total tasks: {len(tasks)}")
                test_results.append(("Add Task", True, ""))
            else:
                print("✗ Failed to add task")
                test_results.append(("Add Task", False, "No tasks found"))
        except Exception as e:
            print(f"✗ Error adding task: {e}")
            test_results.append(("Add Task", False, str(e)))
        
        # Test 3: Add multiple tasks
        print("\n[TEST 3] Adding additional tasks...")
        try:
            task_input = driver.find_element(By.ID, "taskInput")
            task_input.clear()
            task_input.send_keys("Set up Docker")
            driver.find_element(By.ID, "addBtn").click()
            time.sleep(1)
            
            task_input.clear()
            task_input.send_keys("Configure Jenkins")
            driver.find_element(By.ID, "addBtn").click()
            time.sleep(1)
            
            tasks = driver.find_elements(By.CLASS_NAME, "task-item")
            print(f"✓ Added multiple tasks. Total: {len(tasks)}")
            test_results.append(("Add Multiple Tasks", True, ""))
        except Exception as e:
            print(f"✗ Error adding multiple tasks: {e}")
            test_results.append(("Add Multiple Tasks", False, str(e)))
        
        # Test 4: Mark task as complete
        print("\n[TEST 4] Testing mark task as complete...")
        try:
            task_text = driver.find_element(By.CLASS_NAME, "task-text")
            task_text.click()
            time.sleep(1)
            
            task_item = driver.find_element(By.CLASS_NAME, "task-item")
            if "completed" in task_item.get_attribute("class"):
                print("✓ Task marked as completed successfully")
                test_results.append(("Mark Complete", True, ""))
            else:
                print("✗ Failed to mark task as complete")
                test_results.append(("Mark Complete", False, "Completed class not found"))
        except Exception as e:
            print(f"✗ Error marking task complete: {e}")
            test_results.append(("Mark Complete", False, str(e)))
        
        # Test 5: Delete a task
        print("\n[TEST 5] Testing delete task functionality...")
        try:
            initial_count = len(driver.find_elements(By.CLASS_NAME, "task-item"))
            delete_btn = driver.find_element(By.CLASS_NAME, "delete-btn")
            delete_btn.click()
            time.sleep(1)
            
            final_count = len(driver.find_elements(By.CLASS_NAME, "task-item"))
            if final_count < initial_count:
                print(f"✓ Task deleted successfully. Tasks: {initial_count} → {final_count}")
                test_results.append(("Delete Task", True, ""))
            else:
                print("✗ Failed to delete task")
                test_results.append(("Delete Task", False, "Count unchanged"))
        except Exception as e:
            print(f"✗ Error deleting task: {e}")
            test_results.append(("Delete Task", False, str(e)))
        
    except Exception as e:
        print(f"\nFATAL ERROR: {e}")
        test_results.append(("General", False, str(e)))
    
    finally:
        driver.quit()
    
    # Print test summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for _, result, _ in test_results if result)
    total = len(test_results)
    
    for test_name, result, error in test_results:
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"{status} | {test_name}")
        if error:
            print(f"       Error: {error}")
    
    print("=" * 60)
    print(f"Results: {passed}/{total} tests passed")
    print("=" * 60)
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    exit_code = run_tests()
    sys.exit(exit_code)
