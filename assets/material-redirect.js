const targets = { '#next-session': 'session-3', '#reference': 'session-2-reference' };
window.location.replace(`../index.html#${targets[window.location.hash] ?? 'session-2'}`);
