const navs=document.querySelectorAll('.nav');navs.forEach(btn=>btn.addEventListener('click',()=>{navs.forEach(x=>x.classList.remove('active'));btn.classList.add('active')}));const tabs=document.querySelectorAll('.tab');tabs.forEach(btn=>btn.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));btn.classList.add('active')}));document.getElementById('newNotebook')?.addEventListener('click',()=>alert('New notebook — ready for backend wiring.'));document.getElementById('send')?.addEventListener('click',()=>alert('Composer ready for MickeyClaw API / Ollama streaming.'));

// --- MickeyClaw Interactive Chatbox Fix ---
document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.querySelector('textarea, input[type="text"]');
    const sendButton = document.querySelector('button svg, button')?.closest('button');
    const chatWorkspace = document.querySelector('.space-y-4, [class*="space-y"]');

    if (chatInput) {
        chatInput.removeAttribute('disabled');
        chatInput.removeAttribute('readonly');
        chatInput.style.pointerEvents = 'auto';
        chatInput.style.cursor = 'text';
        chatInput.placeholder = "Ask MickeyClaw about your sources...";
        
        let parent = chatInput.parentElement;
        while (parent) {
            parent.classList.remove('pointer-events-none');
            parent.style.pointerEvents = 'auto';
            parent = parent.parentElement;
        }

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitMessage();
            }
        });
    }

    if (sendButton) {
        sendButton.style.pointerEvents = 'auto';
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            submitMessage();
        });
    }

    function submitMessage() {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage("You", text, true);
        chatInput.value = '';

        // Trigger an automatic local reply
        setTimeout(() => {
            appendMessage("MickeyClaw", "I am locked, loaded, and fully operational, Boss! How shall we proceed with our next deployment? 🦾💻", false);
        }, 1000);
    }

    function appendMessage(sender, text, isUser) {
        if (!chatWorkspace) return;
        
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex flex-col ${isUser ? 'items-end' : 'items-start'} p-3 rounded-lg mb-2`;
        
        const senderSpan = document.createElement('span');
        senderSpan.className = "text-xs text-gray-400 font-bold mb-1";
        senderSpan.textContent = sender;
        
        const textDiv = document.createElement('div');
        textDiv.className = `p-3 rounded-lg text-sm max-w-[80%] ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'}`;
        textDiv.textContent = text;
        
        msgDiv.appendChild(senderSpan);
        msgDiv.appendChild(textDiv);
        chatWorkspace.appendChild(msgDiv);
        
        chatWorkspace.scrollTop = chatWorkspace.scrollHeight;
    }
});
