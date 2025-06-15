from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class LoginTest:
    INVALID_EMAIL = "invalid@example.com"
    INVALID_PASSWORD = "wrongpassword"
    VALID_EMAIL = "rijad1@gmail.com"
    VALID_PASSWORD = "The7stick-"

    def __init__(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/")
        self.driver.maximize_window()
        time.sleep(1)

    def logout_if_logged_in(self):
        try:
            login_button = self.driver.find_element(By.ID, 'login_button')
            if login_button.text == "Log out":
                login_button.click()
                time.sleep(1)
        except:
            pass  

    def login(self, email, password):
        self.logout_if_logged_in()

        self.driver.find_element(By.ID, 'login_button').click()
        time.sleep(1)

        self.driver.find_element(By.ID, 'email').send_keys(email)
        self.driver.find_element(By.ID, 'password').send_keys(password)

        self.driver.find_element(By.ID, 'submit_button').click()

    def test_invalid_login(self):
        self.login(self.INVALID_EMAIL, self.INVALID_PASSWORD)
        assert self.driver.current_url == "http://localhost:3000/login?", "Expected to stay on login page after failed login"
        time.sleep(1)

    def test_valid_login(self):
        self.login(self.VALID_EMAIL, self.VALID_PASSWORD)
        assert self.driver.current_url == "http://localhost:3000", "Expected to be redirected to home after successful login"
        time.sleep(1)

    def quit(self):
        self.driver.quit()

test = LoginTest()
test.test_invalid_login()
test.test_valid_login()
test.quit()