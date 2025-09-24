from langchain.prompts import PromptTemplate
from langchain.schema import BaseOutputParser
from pydantic import BaseModel, Field
from typing import Literal


class SpamDetectionResult(BaseModel):
    """Результат определения спама"""
    is_spam: Literal["спам", "не спам"] = Field(description="Определение: спам или не спам")
    reason: str = Field(description="Причина определения")


class SpamDetectionParser(BaseOutputParser[SpamDetectionResult]):
    """Парсер для результата определения спама"""
    
    def parse(self, text: str) -> SpamDetectionResult:
        import re
        
        is_spam = "не спам"  # по умолчанию
        reason = ""
        
        # Ищем определение спама (учитываем markdown форматирование)
        spam_patterns = [
            r'\*\*Спам:\*\*\s*(да|нет|спам|не спам)',
            r'Спам:\s*(да|нет|спам|не спам)',
            r'спам.*?(да|нет|является)',
        ]
        
        for pattern in spam_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                spam_value = match.group(1).lower()
                if spam_value in ['да', 'спам', 'является']:
                    is_spam = "спам"
                else:
                    is_spam = "не спам"
                break
        
        # Ищем причину (учитываем markdown форматирование)
        reason_patterns = [
            r'\*\*Причина:\*\*\s*(.+?)(?=\n\n|\n\*\*|$)',
            r'Причина:\s*(.+?)(?=\n\n|\n\*\*|$)',
            r'причина.*?:(.+?)(?=\n\n|\n\*\*|$)',
        ]
        
        for pattern in reason_patterns:
            match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
            if match:
                reason = match.group(1).strip()
                # Убираем лишние символы и форматирование
                reason = re.sub(r'\*\*', '', reason)  # убираем **
                reason = re.sub(r'\n\s*–\s*', '\n• ', reason)  # заменяем – на •
                reason = reason.strip()
                break
        
        if not reason:
            reason = "Не указана причина"
            
        return SpamDetectionResult(is_spam=is_spam, reason=reason)


# Промпт для определения спама
spam_detection_prompt = PromptTemplate(
    input_variables=["email_text"],
    template="""Проанализируй следующее письмо и определи, является ли оно спамом:

Письмо:
{email_text}

Критерии для определения спама:
- Подозрительные ссылки или домены
- Призывы к срочным действиям
- Слишком много восклицательных знаков или заглавных букв
- Предложения быстрого заработка или выигрыша
- Запросы личной информации
- Подозрительные вложения
- Непрофессиональное оформление
- Массовая рассылка без персонализации

Ответь в следующем формате:
Спам: [да/нет]
Причина: [краткое объяснение причины]

Если письмо является спамом, укажи конкретные признаки. Если не спам, объясни почему письмо выглядит легитимно."""
)



def create_spam_detection_chain(llm):
    """Создать цепочку для определения спама"""
    from langchain.chains import LLMChain
    
    chain = LLMChain(
        llm=llm,
        prompt=spam_detection_prompt,
        output_parser=SpamDetectionParser()
    )
    
    return chain


# Пример использования:
if __name__ == "__main__":
    # Пример письма-спама
    spam_email = """
    СРОЧНО! ВЫ ВЫИГРАЛИ 1,000,000 РУБЛЕЙ!!!
    
    Поздравляем! Вы стали победителем нашей лотереи!
    Чтобы получить приз, срочно перейдите по ссылке: http://suspicious-site.ru/win
    И введите свои данные: номер карты, CVV код и пароль.
    
    Действуйте быстро - приз действует только 24 часа!
    """
    
    # Пример обычного письма
    normal_email = """
    Здравствуйте,
    
    Напоминаем вам о предстоящей встрече завтра в 14:00 в конференц-зале.
    Пожалуйста, подготовьте презентацию по проекту.
    
    С уважением,
    Команда HR
    """
    
    print("Пример спам-письма:")
    print(spam_email)
    print("\nПример обычного письма:")
    print(normal_email)
