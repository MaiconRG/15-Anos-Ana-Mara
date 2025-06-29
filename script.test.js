const axios = require('axios');
const { test, expect } = require('@jest/globals');

test('verifica se o endpoint /save-confirmation está funcionando', async () => {
    const response = await axios.get('http://localhost:3000/save-confirmation');
    expect(response.status).toBe(200);
});