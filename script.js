function computeLPS(pattern) {
    let m = pattern.length;
    let lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;
    while (i < m) {
        if (pattern[i].toLowerCase() === pattern[len].toLowerCase()) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function kmp(text, pattern) {
    const lps = computeLPS(pattern);
    let i = 0, j = 0;
    let n = text.length;
    let m = pattern.length;
    while (i < n) {
        if (pattern[j].toLowerCase() === text[i].toLowerCase()) {
            i++;
            j++;
        } else {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
        
        if (j === m) {
            return i - j;  
        }
    }
    return -1;  
}

function censorMessage(message) {
    let censoredMessage = message; 
    for (let word of bannedWords) {
        let idx;
        while ((idx = kmp(censoredMessage, word)) !== -1) {
            console.log('Found banned word:', word, 'at index:', idx);
            const stars = '*'.repeat(word.length);
            censoredMessage = censoredMessage.slice(0, idx) + stars + censoredMessage.slice(idx + word.length);
            console.log('Message after censoring:', censoredMessage);
        }
    }
    console.log('Final censored message:', censoredMessage);
    return censoredMessage;
}

// Banned words array
const bannedWords = [
    "idiot", "fool", "dumb", "damn", "stupid", "loser", "ugly",
    "suck", "moron", "jerk", "trash", "lame", "shut up", "douche",
    "bastard", "crap", "bugger", "arse", "dick", "screw you",
    "nonsense", "bloody", "silly", "dork", "freak", "weirdo",
    "nerd", "pathetic", "cheater", "toxic", "hate", "kill", "losing",
    "garbage", "smelly", "gross", "mad", "insane", "creep", "whack",
    "useless", "chump", "dunce", "twit", "nitwit", "imbecile", "sissy",
    "dirtbag", "knucklehead", "scum", "scumbag", "punk", "dork", "dimwit", "fuck","fucking","asshole"
]

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');    
    const chatBox = document.getElementById('chatBox');
    const input = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const clearButton = document.getElementById('clearButton');
    // Test click handler
    sendButton.addEventListener('click', () => {
        const userMessage = input.value.trim();
        if (!userMessage) {
            console.log('Empty message, not sending');
            return;
        }
        const filteredMessage = censorMessage(userMessage);
        console.log('Filtered message:', filteredMessage);
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message';
        msgDiv.textContent = filteredMessage;
        chatBox.appendChild(msgDiv);
        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    clearButton.addEventListener('click', () => {
        chatBox.innerHTML = '';
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
});

