export default async function handler(req, res) {
    // ✅ Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // ✅ Handle preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { year, month, date } = req.body;

        const apiResponse = await fetch('https://json.apiastro.com/nakshatra-durations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'Slr5QqH2y34OvWg5NOTyi4EkVyn1jQS73nXKZT51'
            },
            body: JSON.stringify({
                year,
                month,
                date,
                hours: 6,
                minutes: 0,
                seconds: 0,
                longitude: 78.4666,
                latitude: 17.38333,
                timezone: 5.5,
                config: {
                    observation_point: 'geocentric',
                    ayanamsha: 'lahiri'
                }
            })
        });

        const data = await apiResponse.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
