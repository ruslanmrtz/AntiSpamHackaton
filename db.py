from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Создание базы данных
Base = declarative_base()

class SpamMessage(Base):
    __tablename__ = 'spam_messages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(String(255))
    subject = Column(String(255))
    text = Column(String(1000))  # можно увеличить при необходимости
    sender = Column(String(255))
    recipient = Column(String(255))
    reason = Column(String(500))

    def __repr__(self):
        return f"<SpamMessage(id={self.id}, subject='{self.subject}', sender='{self.sender}')>"

# Создание движка и таблиц
engine = create_engine('sqlite:///spam.db', echo=False)  # echo=False, чтобы не выводить SQL
Base.metadata.create_all(engine)

# Создание сессии
Session = sessionmaker(bind=engine)
session = Session()

# Функция добавления спам-письма
def add_spam_message(subject, text, sender, recipient, date, reason):
    new_message = SpamMessage(
        subject=subject,
        text=text,
        sender=sender,
        recipient=recipient,
        date=date,
        reason=reason
    )
    session.add(new_message)
    session.commit()
    print(f"Письмо от {sender} добавлено с ID {new_message.id}")

# Функция получения всех писем
def get_all_spam_messages():
    messages = session.query(SpamMessage).all()
    return messages

# Пример использования
if __name__ == "__main__":
    # Добавление письма
    add_spam_message(
        subject="Спам тема",
        text="Текст спам сообщения",
        sender="sender@example.com",
        recipient="recipient@example.com"
    )

    # Получение всех писем
    all_messages = get_all_spam_messages()
    for msg in all_messages:
        print(msg)