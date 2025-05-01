export default async function handler(req, res) {
    const { year, month, date } = req.query;

    // Call the external API
    const response = await fetch('https://json.apiastro.com/nakshatra-durations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'Slr5QqH2y34OvWg5NOTyi4EkVyn1jQS73nXKZT51'  // Replace with your real API key
        },
        body: JSON.stringify({
            year: parseInt(year),
            month: parseInt(month),
            date: parseInt(date),
            hours: 6,
            minutes: 0,
            seconds: 0,
            longitude: 78.4666,
            latitude: 17.38333,
            timezone: 5.5,
            config: {
                observation_point: "geocentric",
                ayanamsha: "lahiri"
            }
        })
    });

    const data = await response.json();

    // Add CORS header
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Return data
    res.status(200).json(data);
}