
// --- MickeyClaw Dynamic Interaction Layer ---
document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.querySelector('.prompt');
    const sendButton = document.getElementById('send') || document.querySelector('.send');
    const chatWorkspace = document.querySelector('.chat-messages') || document.querySelector('.space-y-4') || document.body;

    const placeholder = "Ask MickeyClaw about your sources…";

    if (chatInput) {
        // Remove any old mouse lockout styles
        chatInput.style.pointerEvents = 'auto';
        
        // Handle Placeholder focus/blur
        chatInput.addEventListener('focus', () => {
            if (chatInput.textContent.trim() === placeholder) {
                chatInput.textContent = '';
                chatInput.classList.remove('text-gray-400');
            }
        });

        chatInput.addEventListener('blur', () => {
            if (chatInput.textContent.trim() === '') {
                chatInput.textContent = placeholder;
                chatInput.classList.add('text-gray-400');
            }
        });

        // Enter key to send (Shift+Enter for new line)
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitMessage();
            }
        });
    }

    if (sendButton) {
        sendButton.style.pointerEvents = 'auto';
        sendButton.style.cursor = 'pointer';
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            submitMessage();
        });
    }

    function submitMessage() {
        if (!chatInput) return;
        const text = chatInput.textContent.trim();
        if (!text || text === placeholder) return;

        appendMessage("You", text, true);
        chatInput.textContent = '';
        chatInput.focus();

        // Mickey's instant local confirmation
        setTimeout(() => {
            appendMessage("MickeyClaw", "Sovereign UI is officially unlocked and dynamic, Boss! Ready to orchestrate operations. 🦾🔥", false);
        }, 800);
    }

    function appendMessage(sender, text, isUser) {
        if (!chatWorkspace) return;
        
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex flex-col ${isUser ? 'items-end' : 'items-start'} p-3 rounded-lg mb-4 animation-fade-in`;
        
        const senderSpan = document.createElement('span');
        senderSpan.className = "text-xs text-gray-500 font-semibold mb-1";
        senderSpan.textContent = sender;
        
        const textDiv = document.createElement('div');
        textDiv.className = `p-3 rounded-lg text-sm max-w-[75%] ${isUser ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200 border border-zinc-700'}`;
        textDiv.textContent = text;
        
        msgDiv.appendChild(senderSpan);
        msgDiv.appendChild(textDiv);
        chatWorkspace.appendChild(msgDiv);
        
        // Auto-scroll to latest message
        chatWorkspace.scrollTop = chatWorkspace.scrollHeight;
    }
});
