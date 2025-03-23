export async function sendMessageToGemini(userMessage) {
    const API_KEY = "AIzaSyDelziGNyzIWGZ7pscRcPVKnHzwfNiuuGU"; // Your API key
    // Updated to use gemini-2.0-flash model
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  
    try {
      console.log("Sending request to Gemini API...");
      
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMessage
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });
  
      const data = await response.json();
      console.log("Response from Gemini API:", data);
      
      if (data.error) {
        console.error("Gemini API error:", data.error);
        throw new Error(data.error.message || "Error from Gemini API");
      }
      
      if (data.candidates && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected Gemini API response:", data);
        throw new Error("Invalid response structure from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }