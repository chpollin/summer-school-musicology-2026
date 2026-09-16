const targets = { '#next-session': 'final-project', '#reference': 'session-2-tei' };
window.location.replace(`../index.html#${targets[window.location.hash] ?? 'session-2-tei'}`);
