from RPLCD import CharLCD
import RPi.GPIO as GPIO
import time

def main():
    
    while True:
        messageFile = open("message.txt","r")
        message = messageFile.read()

        print(message)
        
        lcd = CharLCD(numbering_mode=GPIO.BCM, cols=16, rows=2, pin_rs=7, pin_e=8, pins_data=[25,24, 23,18])
    
        lcd.clear()                
        lcd.write_string(message)

        time.sleep(1) 
            
        lcd.display_enabled=False        
        
        time.sleep(1) 
        
        lcd.display_enabled=True

        time.sleep(1) 
        
        lcd.display_enabled=False
        
        time.sleep(1) 
        
        lcd.display_enabled=True
        
#Begin program
try:
    main() 
except KeyboardInterrupt:
    pass   
 
finally:
    GPIO.cleanup()