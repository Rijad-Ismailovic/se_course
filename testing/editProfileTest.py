from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class EditProfileTest:
    def __init__(self):
        self.driver = webdriver.Chrome()
        self.url = "http://localhost:3000"
        self.email = "rijad1@gmail.com"
        self.old_password = "The7stick-"
        self.new_password = "The7stick-"

    def run_test(self):
        driver = self.driver
        driver.get(self.url)
        driver.maximize_window()
        time.sleep(2)

        driver.find_element(By.ID, 'login_button').click()
        time.sleep(1)
        driver.find_element(By.ID, 'email').send_keys(self.email)
        driver.find_element(By.ID, 'password').send_keys(self.old_password)
        driver.find_element(By.ID, 'submit_button').click()
        time.sleep(2)

        driver.get(f"{self.url}/profile/902")
        time.sleep(1)

        driver.find_element(By.ID, 'edit_icon').click()
        time.sleep(2)

        driver.find_element(By.ID, 'firstName').clear()
        driver.find_element(By.ID, 'firstName').send_keys("New")

        driver.find_element(By.ID, 'lastName').clear()
        driver.find_element(By.ID, 'lastName').send_keys("Test")

        driver.find_element(By.ID, 'oldPassword').send_keys(self.old_password)
        driver.find_element(By.ID, 'newPassword').send_keys(self.new_password)

        driver.find_element(By.ID, 'save_changes_button').click()
        time.sleep(3)

        assert driver.current_url.startswith(f"{self.url}/profile/"), "Expected to be redirected to profile page"
        driver.quit()

test = EditProfileTest()
test.run_test()
