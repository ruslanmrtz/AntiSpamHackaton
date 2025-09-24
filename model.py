from gigachat import GigaChat
import os
import json
import re
from dotenv import load_dotenv
from spam_detection_prompt import spam_detection_prompt, SpamDetectionParser

# Загружаем переменные из .env файла
load_dotenv()

token = os.getenv('GIGACHAT_TOKEN')

giga = GigaChat(
    model="GigaChat-2",
    verify_ssl_certs=False,
    credentials=token
)


def get_model_response(prompt):
    """Получить ответ от модели GigaChat"""
    response = giga.chat({
        "messages": [
            {
                "role": "user",
                "content": prompt,
            }
        ],
    })
    
    return response.choices[0].message.content


def detect_spam(email_text):
    """Определить спам в письме и вернуть результат в JSON"""
    
    # Используем промпт из spam_detection_prompt.py
    prompt = spam_detection_prompt.format(email_text=email_text)
    
    response = get_model_response(prompt)
    
    # Используем парсер из spam_detection_prompt.py
    parser = SpamDetectionParser()
    parsed_result = parser.parse(response)
    
    # Формируем JSON ответ
    result = {
        "is_spam": parsed_result.is_spam,
        "reason": parsed_result.reason,
        "raw_response": response
    }
    
    return json.dumps(result, ensure_ascii=False, indent=2)



# print(detect_spam('''СРОЧНО! ВЫ ВЫИГРАЛИ 1,000,000 РУБЛЕЙ!!!
    
#     Поздравляем! Вы стали победителем нашей лотереи!
#     Чтобы получить приз, срочно перейдите по ссылке: http://suspicious-site.ru/win
#     И введите свои данные: номер карты, CVV код и пароль.
    
#     Действуйте быстро - приз действует только 24 часа!'''))
