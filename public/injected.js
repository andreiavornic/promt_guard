(() => {
    const originalFetch = window.fetch;

    window.fetch = async function (...args) {
        const [resource, config] = args;

        const url =
            typeof resource === 'string'
                ? resource
                : resource instanceof Request
                    ? resource.url
                    : '';

        const isConversation =
            url.includes('/backend-api/conversation') ||
            url.includes('/conversation');

        if (!isConversation) {
            return originalFetch.apply(this, args);
        }

        let bodyText = config?.body;

        if (!bodyText && resource instanceof Request) {
            try {
                bodyText = await resource.clone().text();
            } catch {
                return originalFetch.apply(this, args);
            }
        }

        if (!bodyText) {
            return originalFetch.apply(this, args);
        }

        try {
            const body = JSON.parse(bodyText);
            const prompt = extractPrompt(body);

            if (typeof prompt !== 'string' || !prompt.trim()) {
                return originalFetch.apply(this, args);
            }

            const response = await sendToContentScript(prompt, 4000);

            if (!response || !response.hasIssues || !response.anonymizedText) {
                return originalFetch.apply(this, args);
            }

            replacePrompt(body, response.anonymizedText);
            const newBodyText = JSON.stringify(body);

            if (config) {
                config.body = newBodyText;
                return originalFetch.call(this, resource, config);
            }

            if (resource instanceof Request) {
                const newRequest = new Request(resource, { body: newBodyText });
                return originalFetch.call(this, newRequest);
            }
        } catch (e) {
            console.warn('[PromptGuard] interception error:', e);
        }

        return originalFetch.apply(this, args);
    };

    function sendToContentScript(prompt, timeoutMs = 0) {
        return new Promise((resolve) => {
            const messageId =
                'pg_' + Date.now() + '_' + Math.random().toString(36).slice(2);

            const handler = (event) => {
                if (
                    event.source === window &&
                    event.data?.type === 'PROMPT_GUARD_RESPONSE' &&
                    event.data.messageId === messageId
                ) {
                    window.removeEventListener('message', handler);
                    resolve(event.data.payload);
                }
            };

            window.addEventListener('message', handler);

            setTimeout(() => {
                window.removeEventListener('message', handler);
                resolve(null);
            }, timeoutMs);

            window.postMessage(
                {
                    type: 'PROMPT_GUARD_REQUEST',
                    messageId,
                    payload: prompt,
                },
                '*'
            );
        });
    }
})();

function extractPrompt(body) {
    try {
        return body?.messages?.[0]?.content?.parts?.[0];
    } catch {
        return null;
    }
}

function replacePrompt(body, newText) {
    try {
        if (body?.messages?.[0]?.content?.parts?.length) {
            body.messages[0].content.parts[0] = newText;
        }
    } catch {}
}
