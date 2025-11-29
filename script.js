/**
 * Usiru AI Medical Assistant - JavaScript Logic
 * --------------------------------------------
 * NOTE: This is a client-side mock implementation for demonstration.
 * Full Gemini AI integration (API calls, key management, chat stream) 
 * would require a more complex backend or a serverless function.
 */

// --- Global DOM Elements ---
const views = {
    'dashboard': document.getElementById('view-dashboard'),
    'chat': document.getElementById('view-chat'),
    'docs': document.getElementById('view-docs'),
    'settings': document.getElementById('view-settings') // Assuming a settings view would be added
};
const navButtons = {
    'dashboard': document.getElementById('nav-dashboard'),
    'chat': document.getElementById('nav-chat'),
    'docs': document.getElementById('nav-docs'),
    'settings': document.getElementById('nav-settings')
};
const pageTitle = document.getElementById('page-title');
const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const typingIndicator = document.getElementById('typing-indicator');
const reportInput = document.getElementById('report-input');
const reportOutput = document.getElementById('report-output');
const reportContent = document.getElementById('report-content');
const analyzeBtn = document.getElementById('analyze-btn');


// --- Core Functions ---

/**
 * Switches the active view (tab) in the application.
 * @param {string} targetViewId - The ID of the view to switch to ('dashboard', 'chat', 'docs', 'settings').
 */
function switchTab(targetViewId) {
    // 1. Hide all views and remove active state from all nav buttons
    Object.keys(views).forEach(viewId => {
        if (views[viewId]) {
            views[viewId].classList.add('hidden');
        }
        if (navButtons[viewId]) {
            navButtons[viewId].classList.remove('bg-emerald-50', 'text-emerald-600', 'shadow-sm', 'shadow-emerald-100');
            navButtons[viewId].classList.add('text-slate-400', 'hover:bg-slate-50', 'hover:text-slate-900');
        }
    });

    // 2. Show the target view and set active state on the corresponding nav button
    const targetView = views[targetViewId];
    const targetNav = navButtons[targetViewId];

    if (targetView) {
        targetView.classList.remove('hidden');
    }

    if (targetNav) {
        targetNav.classList.add('bg-emerald-50', 'text-emerald-600', 'shadow-sm', 'shadow-emerald-100');
        targetNav.classList.remove('text-slate-400', 'hover:bg-slate-50', 'hover:text-slate-900');
    }

    // 3. Update the header title
    pageTitle.textContent = targetViewId.charAt(0).toUpperCase() + targetViewId.slice(1);
    if (targetViewId === 'docs') pageTitle.textContent = 'Report Analyzer';
}

/**
 * Creates and appends a new message to the chat container.
 * @param {string} content - The HTML content of the message.
 * @param {boolean} isUser - True for a user message, false for an AI message.
 */
function appendMessage(content, isUser) {
    const messageHtml = isUser 
        ? createClientMessage(content) 
        : createBotMessage(content);
        
    chatContainer.insertAdjacentHTML('beforeend', messageHtml);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
    lucide.createIcons(); // Re-initialize icons for new message
}

function createClientMessage(content) {
    // Escape HTML from user input to prevent XSS (basic measure)
    const safeContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `
        <div class="flex flex-row-reverse gap-4 message-enter">
            <div class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 shadow-md">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mani" alt="User" class="w-full h-full object-cover rounded-full">
            </div>
            <div class="flex flex-col items-end gap-1 max-w-2xl">
                <span class="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider">Mani</span>
                <div class="bg-emerald-600 text-white p-5 rounded-2xl rounded-tr-none shadow-md text-sm leading-relaxed">
                    <p>${safeContent}</p>
                </div>
            </div>
        </div>
    `;
}

function createBotMessage(content) {
    // Assuming the AI response (content) is already safe Markdown/HTML
    return `
        <div class="flex gap-4 message-enter">
            <div class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 shadow-md">
                <i data-lucide="bot" class="text-white w-6 h-6"></i>
            </div>
            <div class="flex flex-col gap-1 max-w-2xl">
                <span class="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Usiru AI</span>
                <div class="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm leading-relaxed text-slate-600 prose">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

// --- Event Handlers ---

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userInput = chatInput.value.trim();

    if (userInput) {
        // 1. Append user message
        appendMessage(userInput, true);

        // 2. Clear input and show typing indicator
        chatInput.value = '';
        typingIndicator.classList.remove('hidden');
        chatContainer.scrollTop = chatContainer.scrollHeight; 

        // 3. Simulate AI response delay
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
            // Mock AI response with some markdown and HTML structure (like the table)
            const aiResponse = `
                <p>Based on your input ("${userInput}"), it sounds like you may be experiencing some common symptoms. As an AI, I can only offer informational guidance.</p>
                
                <h4>Suggested Initial Steps:</h4>
                <ul>
                    <li><b>Rest:</b> Ensure you get plenty of sleep tonight.</li>
                    <li><b>Hydration:</b> Drink water or electrolytes constantly.</li>
                    <li><b>OTC Relief:</b> Consider Ibuprofen for pain relief.</li>
                </ul>

                <p>For persistent or severe symptoms, please consult a medical professional directly.</p>

                <h4>Example Diet Plan (General Wellness)</h4>
                <table class="diet-table">
                    <thead>
                        <tr>
                            <th>Meal</th>
                            <th>Suggestion</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Breakfast</td>
                            <td>Oatmeal with Berries</td>
                            <td>High in fiber and antioxidants.</td>
                        </tr>
                        <tr>
                            <td>Lunch</td>
                            <td>Lentil Soup</td>
                            <td>Easy to digest and nutrient-dense.</td>
                        </tr>
                        <tr>
                            <td>Dinner</td>
                            <td>Grilled Chicken & Steamed Veggies</td>
                            <td>Lean protein and essential vitamins.</td>
                        </tr>
                    </tbody>
                </table>
            `;
            appendMessage(aiResponse, false);
        }, 2000); // 2-second delay for effect
    }
});


function clearReport() {
    reportInput.value = '';
    reportContent.innerHTML = '';
    reportOutput.classList.add('hidden');
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Simplify & Explain';
    lucide.createIcons();
}

function analyzeReport() {
    const reportText = reportInput.value.trim();

    if (!reportText) {
        alert("Please paste some medical text to analyze.");
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> Analyzing...';
    lucide.createIcons();
    reportOutput.classList.remove('hidden');
    reportContent.innerHTML = '<h4>Processing...</h4><p>The AI is currently analyzing the document for key findings, conditions, and treatment protocols.</p>';

    // Simulate AI analysis delay
    setTimeout(() => {
        // Mock analysis result
        const analysisResult = `
            <h3>Summary: Patient with Acute Bronchitis</h3>
            <p>The report indicates a patient presenting with symptoms consistent with <b>Acute Bronchitis</b>. This is a short-term inflammation of the airways (bronchial tubes) that commonly follows a viral respiratory infection.</p>
            
            <h4>Key Findings</h4>
            <ul>
                <li><b>Diagnosis:</b> Acute Bronchitis</li>
                <li><b>Causative Agent:</b> Likely viral.</li>
                <li><b>Symptoms Cited:</b> Severe cough, mild fever, chest discomfort.</li>
            </ul>

            <h4>Prescribed Treatment</h4>
            <p>The physician has prescribed <b>Amoxicillin</b>. This is an antibiotic commonly used to treat bacterial infections, suggesting the physician suspects or is treating for a secondary bacterial infection.</p>

            <h4>Important Next Steps</h4>
            <ol>
                <li><b>Take Medication:</b> Complete the full course of Amoxicillin as prescribed, even if you feel better.</li>
                <li><b>Follow-up:</b> If symptoms worsen after 3 days, contact your doctor immediately.</li>
                <li><b>Rest and Fluids:</b> Critical for recovery.</li>
            </ol>
        `;
        
        reportContent.innerHTML = analysisResult;
        
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i data-lucide="sparkles" class="w-4 h-4"></i> <span class="font-medium text-sm">Simplify & Explain</span>';
        lucide.createIcons();
    }, 3500); // 3.5-second delay for analysis
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Initialize default view (Dashboard)
    switchTab('dashboard');
    lucide.createIcons(); // Ensure all initial icons are rendered
});