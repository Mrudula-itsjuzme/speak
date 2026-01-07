/**
 * Test OpenRouter Integration
 * This script tests the OpenRouter client directly
 */

// Set environment variable for testing
process.env.OPENROUTER_API_KEY = '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';

async function testOpenRouterClient() {
    console.log('🧪 Testing OpenRouter Client Integration\n');

    // Import the client (using dynamic import for ES modules)
    const { generateContentSafe, generateSessionSummary } = await import('./src/lib/openrouter/client.ts');

    // Test 1: Simple content generation
    console.log('Test 1: Simple Content Generation');
    console.log('═══════════════════════════════════\n');

    const simplePrompt = 'Say "Hello from OpenRouter!" in a friendly way.';
    const result1 = await generateContentSafe(simplePrompt);

    if (result1) {
        console.log('✅ Success!');
        console.log('Response:', result1);
    } else {
        console.log('❌ Failed');
    }

    console.log('\n');

    // Test 2: Language learning prompt (similar to what the app does)
    console.log('Test 2: Language Learning Prompt');
    console.log('═══════════════════════════════════\n');

    const learningPrompt = `
    Create a detailed system prompt for an AI language tutor with the following traits:
    - Target Language: Spanish
    - User's Native Language: English
    - Personality: Friendly and encouraging
    - Current Topic: Ordering food at a restaurant
    - User Level: Beginner

    Output JSON format:
    {
      "systemPrompt": "The detailed instruction for the AI...",
      "firstMessage": "The opening greeting in the target language..."
    }
  `;

    const result2 = await generateContentSafe(learningPrompt);

    if (result2) {
        console.log('✅ Success!');
        console.log('Response (first 200 chars):', result2.substring(0, 200) + '...');

        // Try to parse JSON
        try {
            const cleanText = result2.replace(/```json\n|\n```/g, '').trim();
            const parsed = JSON.parse(cleanText);
            console.log('\n📝 Parsed JSON:');
            console.log('  - System Prompt:', parsed.systemPrompt?.substring(0, 100) + '...');
            console.log('  - First Message:', parsed.firstMessage);
        } catch (e) {
            console.log('⚠️  Could not parse as JSON, but got a response');
        }
    } else {
        console.log('❌ Failed');
    }

    console.log('\n');

    // Test 3: Session Summary
    console.log('Test 3: Session Summary Generation');
    console.log('═══════════════════════════════════\n');

    const mockTranscript = `
    User: Hola, ¿cómo estás?
    AI: ¡Hola! Estoy muy bien, gracias. ¿Y tú?
    User: Yo estoy bien también. Me gusta practicar español.
    AI: ¡Excelente! Tu pronunciación es muy buena.
  `;

    const summary = await generateSessionSummary(mockTranscript);

    if (summary) {
        console.log('✅ Success!');
        console.log('Summary:', JSON.stringify(summary, null, 2));
    } else {
        console.log('❌ Failed');
    }

    console.log('\n');
    console.log('═══════════════════════════════════');
    console.log('🎉 All tests completed!');
}

// Run tests
testOpenRouterClient().catch(console.error);
