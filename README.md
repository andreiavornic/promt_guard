# Prompt Guard

A browser extension that protects users from accidentally leaking sensitive data into AI prompts. It detects email addresses in real time, anonymizes them, and alerts the user before submission.

## Features

- Detects hidden or masked email addresses in prompts
- Automatically replaces emails with placeholders
- Alerts when sensitive data is found
- Keeps a history of detected issues

## Installation

```bash
git clone https://github.com/andreiavornic/promt_guard.git
cd promt_guard
npm install
npm run build
```

Then load in Chrome/Edge:
1. Open `chrome://extensions`
2. Enable Developer mode
3. Click Load unpacked and select the `dist/` folder

## Example

**Input:** `You can reach me at john.doe@gmail.com`

**Output:** `You can reach me at [EMAIL_ADDRESS]`

## Development

```bash
npm run dev
```

## Roadmap

- Phone numbers detection
- API keys detection
- Personal identifiers
- Custom detection rules
