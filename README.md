| Deployed at: [![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://exerciser-mu.vercel.app/) | Built with [![Svelte](https://img.shields.io/badge/svelte-%23ff3e00.svg?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/) | [![DeepScan grade](https://deepscan.io/api/teams/21109/projects/25498/branches/799588/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=21109&pid=25498&bid=799588) |
|:-------:|:---------:|:------:|

# Interval exerciser

## Description
This is an interval timer app with a few preset workouts. I built it entirely for my use. Hit start and it will guide you through the workout with voice cues. Each exercise and time interval can be customized, but nothing will be saved between sessions.

## APIs used
- SpeechSynthesis: <a href='https://dev.to/taw/getting-started-with-web-speech-synthesis-api-and-svelte-3l13'>this Chrome develepors article</a> and <a href='https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis'>the MDN entry</a> were helpful. I wrote a [web speech demo in svelte](https://web-speech.vercel.app/) while learning.
- WakeLock API: again I referred to <a href='https://web.dev/wakelock/'>this web.dev article</a> and <a href='https://developer.mozilla.org/en-US/docs/Web/API/WakeLock'>the MDN entry</a> to learn how to keep the screen awake.

## Colours
I used my own [OKLCH colour palette picker](https://sprightly-dusk-5ee998.netlify.app/) to generate colours. Its also deployed [at vercel](https://palette-picker-beta.vercel.app/), but for some reason the sizing is off. If anyone has suggestions on how to fix that, please let me know.
