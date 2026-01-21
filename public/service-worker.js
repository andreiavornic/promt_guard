const EMAIL_REGEX = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;

function maskEmail(email) {
    const [name, domain] = email.split('@');
    return `${name[0]}***@${domain}`;
}

function detectAndAnonymizeEmails(text) {
    EMAIL_REGEX.lastIndex = 0; // Reset regex state
    const matches = text.match(EMAIL_REGEX);

    if (!matches) {
        return {
            hasIssues: false,
            anonymizedText: text,
            emails: [],
        };
    }

    return {
        hasIssues: true,
        anonymizedText: text.replace(EMAIL_REGEX, '[EMAIL_ADDRESS]'),
        emails: [...new Set(matches)], // Remove duplicates
    };
}

async function onPromptSubmit(originalPrompt) {
    const dismissed = await isGuardDismissed();
    if (dismissed) {
        // Nu masca, returnează textul original
        return {
            hasIssues: false,
            anonymizedText: originalPrompt,
            emails: [],
        };
    }
    const result = detectAndAnonymizeEmails(originalPrompt);

    if (!result.hasIssues) {
        return result;
    }

    const stored = await chrome.storage.local.get(['history', 'issues']);

    const history = stored.history || [];
    const issues = stored.issues || [];

    result.emails.forEach(email => {
        const masked = maskEmail(email);

        // HISTORY (persistent)
        if (!history.some(h => h.email === masked)) {
            history.push({
                id: crypto.randomUUID(),
                email: masked,
                createdAt: Date.now(),
            });
        }

        // ISSUES (session-only)
        if (!issues.some(i => i.email === masked)) {
            issues.push({
                id: crypto.randomUUID(),
                email: masked,
                createdAt: Date.now(),
            });
        }
    });

    await chrome.storage.local.set({ history, issues });

    return result;
}


chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'PROMPT_SUBMIT') {
        onPromptSubmit(message.payload)
            .then(result => sendResponse(result))
            .catch(err => {
                console.error('[PromptGuard] Error:', err);
                sendResponse({
                    hasIssues: false,
                    anonymizedText: message.payload,
                    emails: [],
                });
            });
        return true;
    }
});

chrome.runtime.onInstalled.addListener(async () => {
    const { history } = await chrome.storage.local.get('history');
    if (!Array.isArray(history)) {
        await chrome.storage.local.set({ history: [] });
    }
    await chrome.storage.local.set({ issues: [] });
    console.log('[PromptGuard] Service worker installed');
});


chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;

    if (changes.issues?.newValue && changes.issues.oldValue) {
        const oldIssues = changes.issues.oldValue;
        const newIssues = changes.issues.newValue;

        if (newIssues.length > oldIssues.length) {
            const added = newIssues.filter(
                n => !oldIssues.some(o => o.email === n.email)
            );

            if (added.length > 0) {
                chrome.action.setBadgeText({ text: '!' });
                chrome.action.setBadgeBackgroundColor({ color: '#FF6B00' });

                console.log(
                    '[PromptGuard] New issues detected:',
                    added.length
                );
            }
        }
    }
});

async function isGuardDismissed() {
    const result = await chrome.storage.local.get(['guardDismissed', 'guardDismissUntil']);

    if (!result.guardDismissed) {
        return false;
    }

    if (result.guardDismissUntil && Date.now() >= result.guardDismissUntil) {
        await chrome.storage.local.remove(['guardDismissed', 'guardDismissUntil']);
        return false;
    }

    return true;
}

console.log('[PromptGuard] Service worker ready');
