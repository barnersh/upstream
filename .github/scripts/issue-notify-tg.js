(async () => {
    const prData = {
        title: process.env.ISSUE_TITLE,
        url: process.env.ISSUE_URL,
        repo: process.env.ISSUE_REPO,
        description: process.env.ISSUE_DESCRIPTION,
        tgToken: process.env.TG_BOT_TOKEN,
        tgDeployNotifyMessageThreadId: process.env.TG_DEPLOY_NOTIFY_MESSAGE_THREAD_ID,
        tgDeployNotifyChatId: process.env.TG_DEPLOY_NOTIFY_CHAT_ID,
    };


    const url = `https://api.telegram.org/bot${prData.tgToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message_thread_id: `${prData.tgDeployNotifyMessageThreadId}`,
            chat_id: `${prData.tgDeployNotifyChatId}`,
            text: `
🔔 *${prData.repo}*
📌 [${prData.title}](${prData.url})
📝 描述:
${getFirstLine(`${prData.description}`)}
            `,
            parse_mode: 'Markdown'
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
})();

function getFirstLine(text) {
    if (!text) return '';

    const firstLine = text.split('\n').shift().trim();
    return firstLine;
}
