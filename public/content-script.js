console.log('[PromptGuard] Content script loaded');
chrome.storage.local.set({ issues: [] });

// Injectează scriptul în MAIN world
(function injectScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('injected.js');
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
})();

// ✅ Helper pentru a verifica dacă extensia e validă
function isExtensionValid() {
    return !!(chrome.runtime?.id);
}

// Bridge MAIN → Service Worker
window.addEventListener('message', async (event) => {
    if (event.source !== window) return;
    if (event.data?.type !== 'PROMPT_GUARD_REQUEST') return;

    const { messageId, payload } = event.data;

    // ✅ Verifică dacă extensia e validă
    if (!isExtensionValid()) {
        console.warn('[PromptGuard] Extension context invalidated, please refresh the page');
        window.postMessage(
            {
                type: 'PROMPT_GUARD_RESPONSE',
                messageId,
                payload: {
                    hasIssues: false,
                    anonymizedText: payload,
                    emails: []
                },
            },
            '*'
        );
        return;
    }

    try {
        const response = await chrome.runtime.sendMessage({
            type: 'PROMPT_SUBMIT',
            payload,
        });

        window.postMessage(
            {
                type: 'PROMPT_GUARD_RESPONSE',
                messageId,
                payload: response,
            },
            '*'
        );
    } catch (error) {
        // ✅ Handle "Extension context invalidated" specific
        if (error.message?.includes('Extension context invalidated')) {
            console.warn('[PromptGuard] Extension was reloaded, please refresh the page');
        } else {
            console.error('[PromptGuard] Content script error:', error);
        }

        window.postMessage(
            {
                type: 'PROMPT_GUARD_RESPONSE',
                messageId,
                payload: {
                    hasIssues: false,
                    anonymizedText: payload,  // ✅ Returnează textul original
                    emails: []
                },
            },
            '*'
        );
    }
});
