import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chatbot-body');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const toggleBtn = document.getElementById('chatbot-toggle');
    const chatbot = document.getElementById('chatbot');

    // Toggle chatbot hiển thị / ẩn
    toggleBtn.addEventListener("click", () => {
        chatbot.style.display = (chatbot.style.display === "none" || chatbot.style.display === "") 
            ? "flex" 
            : "none";
    });

    // API Gemini
    const API_KEY = "AIzaSyDapOHcfnBAvdfyWA1Xcy0CLzMXXwPTM4A";  // 🔑 Thay bằng API key thật
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function getBotResponse(userMessage) {
        try {
            const prompt = `Bạn là một chuyên gia về billiards ở Việt Nam và thế giới. 
            Hãy trả lời ngắn gọn, chính xác về billiards: "${userMessage}"`;

            const result = await model.generateContent(prompt);
            const text = await result.response.text();  
            return text || "Xin lỗi, mình chưa thể trả lời.";
        } catch (error) {
            console.error("Lỗi API Gemini:", error);
            return "Xin lỗi, mình không thể trả lời lúc này.";
        }
    }

    async function handleSend() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user');
        userInput.value = '';
        sendBtn.disabled = true;

        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message');
        typingIndicator.textContent = 'Đang trả lời...';
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            const botResponse = await getBotResponse(userMessage);
            typingIndicator.remove();
            addMessage(botResponse, 'bot');
        } catch (error) {
            typingIndicator.remove();
            addMessage("Đã xảy ra lỗi, vui lòng thử lại.", 'bot');
        } finally {
            sendBtn.disabled = false;
        }
    }

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
