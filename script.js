// Avengers Initiative: Birthday Mission Script
let currentScreen = 0;
let missionProgress = 0;
let relationshipStartDate = new Date('2023-01-01'); // Change this to your actual relationship start date

// Screen navigation
const screens = document.querySelectorAll('.screen');
const screenIds = [
    'opening-screen',
    'team-intro', 
    'jarvis-system',
    'deadpool-break',
    'mission-tasks',
    'avengers-messages',
    'secret-file',
    'final-scene'
];

function showScreen(screenId) {
    screens.forEach(screen => screen.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.classList.add('fade-in');
    }
}

// Opening Screen
document.getElementById('start-mission').addEventListener('click', () => {
    showScreen('team-intro');
    currentScreen = 1;
});

// Team Introduction
document.getElementById('continue-to-jarvis').addEventListener('click', () => {
    showScreen('jarvis-system');
    currentScreen = 2;
    startJarvisSequence();
});

// JARVIS AI System
function startJarvisSequence() {
    const jarvisMessage = document.getElementById('jarvis-message');
    const messages = [
        "Hello Darwin, I am Deadpool...",
        "Today is a very important day...",
        "It's your birthday 🎉",
        "The Avengers have assembled to celebrate you!",
        "Are you ready for your mission?"
    ];
    
    let messageIndex = 0;
    jarvisMessage.innerHTML = '';
    
    function typeMessage() {
        if (messageIndex < messages.length) {
            jarvisMessage.innerHTML = `<p>${messages[messageIndex]}</p>`;
            messageIndex++;
            setTimeout(typeMessage, 2000);
        }
    }
    
    typeMessage();
}

document.getElementById('deadpool-interrupt').addEventListener('click', () => {
    showScreen('deadpool-break');
    currentScreen = 3;
    setTimeout(() => {
        document.querySelector('.deadpool-funny').style.display = 'block';
        document.querySelector('.deadpool-funny').classList.add('fade-in');
    }, 2000);
});

// Deadpool Break
document.getElementById('start-missions').addEventListener('click', () => {
    showScreen('mission-tasks');
    currentScreen = 4;
});

// Mission Tasks
document.getElementById('task1-btn').addEventListener('click', () => {
    document.getElementById('task1-result').style.display = 'block';
    document.getElementById('task1-result').classList.add('fade-in');
    updateProgress(25);
    document.getElementById('task1-btn').disabled = true;
});

// Deadpool Task - Both buttons do the same thing
document.getElementById('deadpool-yes').addEventListener('click', () => {
    document.getElementById('deadpool-result').style.display = 'block';
    document.getElementById('deadpool-result').classList.add('fade-in');
    updateProgress(50);
    document.getElementById('deadpool-yes').disabled = true;
    document.getElementById('deadpool-no').disabled = true;
});

document.getElementById('deadpool-no').addEventListener('click', () => {
    document.getElementById('deadpool-result').style.display = 'block';
    document.getElementById('deadpool-result').classList.add('fade-in');
    updateProgress(50);
    document.getElementById('deadpool-yes').disabled = true;
    document.getElementById('deadpool-no').disabled = true;
});

document.getElementById('task2-btn').addEventListener('click', () => {
    const answer = document.getElementById('love-answer').value;
    if (answer.trim()) {
        document.getElementById('task2-result').style.display = 'block';
        document.getElementById('task2-result').classList.add('fade-in');
        updateProgress(75);
        document.getElementById('task2-btn').disabled = true;
    } else {
        alert('Please enter an answer first!');
    }
});

document.getElementById('task3-btn').addEventListener('click', () => {
    document.getElementById('task3-result').style.display = 'block';
    document.getElementById('task3-result').classList.add('fade-in');
    updateProgress(100);
    document.getElementById('task3-btn').disabled = true;
    setTimeout(() => {
        document.getElementById('view-messages').style.display = 'inline-block';
        document.getElementById('view-messages').classList.add('fade-in');
    }, 1000);
});

function updateProgress(percent) {
    missionProgress = percent;
    document.getElementById('progress-fill').style.width = percent + '%';
    document.getElementById('progress-text').textContent = `Mission Progress: ${percent}%`;
    
    // Add flash effect
    document.querySelector('.progress-bar').classList.add('flash');
    setTimeout(() => {
        document.querySelector('.progress-bar').classList.remove('flash');
    }, 500);
}

document.getElementById('view-messages').addEventListener('click', () => {
    showScreen('avengers-messages');
    currentScreen = 5;
});

// Avengers Messages
document.getElementById('access-secret').addEventListener('click', () => {
    showScreen('secret-file');
    currentScreen = 6;
});

// Secret File
document.getElementById('final-scene-btn').addEventListener('click', () => {
    console.log('Final scene button clicked');
    showScreen('final-scene');
    currentScreen = 7;
    triggerFinalEffects();
});

// Final Scene Effects
function triggerFinalEffects() {
    // Add confetti effect
    createConfetti();
    
    // Add dramatic music suggestion
    console.log("🎵 Play dramatic Avengers music here!");
    
    // Add final celebration
    setTimeout(() => {
        document.querySelector('.final-message').style.transform = 'scale(1.1)';
        setTimeout(() => {
            document.querySelector('.final-message').style.transform = 'scale(1)';
        }, 500);
    }, 1000);
}

function createConfetti() {
    // Simple confetti effect using CSS
    const confettiCount = 100;
    const container = document.querySelector('.avengers-assemble');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${['#E50914', '#FF0000', '#FFFFFF', '#FFD700'][Math.floor(Math.random() * 4)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: ${Math.random()};
            transform: rotate(${Math.random() * 360}deg);
            animation: fall ${2 + Math.random() * 3}s linear;
            pointer-events: none;
        `;
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentScreen < screenIds.length - 1) {
        currentScreen++;
        showScreen(screenIds[currentScreen]);
    } else if (e.key === 'ArrowLeft' && currentScreen > 0) {
        currentScreen--;
        showScreen(screenIds[currentScreen]);
    }
});

// Easter Egg: Deadpool appears randomly
setTimeout(() => {
    const randomMessages = [
        "Hey! Over here! 😏",
        "Did you see what she did for you? ❤️",
        "You're welcome for the emotional support!",
        "Don't tell the other heroes I said this...",
        "She's pretty amazing, right?"
    ];
    
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    console.log(`🗡️ Deadpool: ${randomMessage}`);
}, 30000);

// Personalization: Replace [His Name] with actual name
function personalizeName(name) {
    const elements = document.querySelectorAll('.highlight, .jarvis-text p');
    elements.forEach(el => {
        if (el.textContent.includes('[His Name]')) {
            el.textContent = el.textContent.replace('[His Name]', name);
        }
    });
}

// Call this function with the actual name
// personalizeName('YourBoyfriendName');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🦸‍♂️ Avengers Initiative: Birthday Mission Loaded!');
    console.log('🗡️ Deadpool is watching...');
    console.log('💙 Mission: Make him smile!');
    
    // Check if critical elements exist
    const elementsToCheck = [
        'final-scene-btn',
        'final-scene'
    ];
    
    elementsToCheck.forEach(id => {
        const element = document.getElementById(id) || document.querySelector('.' + id);
        if (element) {
            console.log(`✅ Found element: ${id}`);
        } else {
            console.error(`❌ Missing element: ${id}`);
        }
    });
    
    // Add some initial effects
    setTimeout(() => {
        document.querySelector('.avengers-logo').classList.add('fade-in');
    }, 500);
});

// Customization helper
window.customizeName = function(name) {
    personalizeName(name);
    console.log(`💙 Personalized for: ${name}`);
};

window.setRelationshipDate = function(dateString) {
    relationshipStartDate = new Date(dateString);
    console.log(`💙 Relationship start date set to: ${dateString}`);
};
