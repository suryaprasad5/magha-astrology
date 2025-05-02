export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { year, month, date } = req.body;

    if (!year || !month || !date) {
        return res.status(400).json({ message: 'Missing required parameters: year, month, date' });
    }

    // Build your request body for the external API
    const requestBody = {
        year: year,
        month: month,
        date: date,
        hours: 6, // or any default you want
        minutes: 0,
        seconds: 0,
        longitude: 78.4666,
        latitude: 17.38333,
        timezone: 5.5,
        config: {
            observation_point: "geocentric",
            ayanamsha: "lahiri"
        }
    };

    try {
        const response = await fetch('https://json.apiastro.com/nakshatra-durations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'Slr5QqH2y34OvWg5NOTyi4EkVyn1jQS73nXKZT51'  // 👈 insert your API key
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ message: 'API error', error: errorText });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error in proxy:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
