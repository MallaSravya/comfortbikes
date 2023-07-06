const chatContainer = document.getElementById("output");
const userMessageInput = document.getElementById("input");
const sendButton = document.getElementById("submit");

sendButton.addEventListener("click", sendMessage);

userMessageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});


function appendMessage(role, content) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (role === "User") {
        messageElement.classList.add("user-message");
        messageElement.innerHTML = `
            <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="user icon">
            <span>${content}</span>
        `;
    } else if (role === "Bot") {
        messageElement.classList.add("bot-message");
        messageElement.innerHTML = `
            <img src="https://m.media-amazon.com/images/I/61HmveTPTsL.jpg" alt="bot icon">
            <span>${content}</span>
        `;
    }

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
    const userMessage = userMessageInput.value;
    if (userMessage.trim() === "") {
        return;
    }

    appendMessage("User", userMessage);
    userMessageInput.value = "";
    userMessageInput.focus();

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: userMessage })
    });

    if (response.ok) {
        const data = await response.json();
        const botMessage = data.message;
        appendMessage("Bot", botMessage);
        speakText(botMessage);
    }
}
