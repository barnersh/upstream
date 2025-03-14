(async () => {
    try {
        const data = {
            notionToken: process.env.NOTION_TOKEN,
            databaseId: process.env.DATABASE_ID,
            issueTitle: process.env.ISSUE_TITLE,
            issueUrl: process.env.ISSUE_URL,
        };

        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${data.notionToken}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                parent: {
                    database_id: `${data.databaseId}`
                },
                properties: {
                    Name: {
                        title: [
                            {
                                text: {
                                    content: `${data.issueTitle}`
                                }
                            }
                        ]
                    },
                    URL: {
                        url: `${data.issueUrl}`
                    }
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Notion API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const res = await response.json();
        console.log('Successfully created Notion page:', data.id);
        return res;
    } catch (error) {
        console.error('Error creating Notion page:', error);
        throw error;
    }
})()