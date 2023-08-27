import nltk
from nltk.chat.util import Chat, reflections

nltk.download('punkt')

# Define patterns and responses for the chatbot
pairs = [
    [
        r"hello|hi|hey",
        ["Hello!", "Hi there!", "How can I help you?"]
    ],
    [
        r"what is your name?",
        ["You can call me ChatBot.", "I'm ChatBot!", "I'm an AI chatbot."]
    ],
    [
        r"how are you?",
        ["I'm good, thanks!", "I'm doing well.", "I'm just a computer program, but I'm here to help!"]
    ],
    [
        r"quit",
        ["Goodbye!", "See you later.", "Have a great day!"]
    ]
]

def main():
    print("Hello! I'm ChatBot. Type 'quit' to exit.")
    chatbot = Chat(pairs, reflections)
    chatbot.converse()

if __name__ == "__main__":
    main()
