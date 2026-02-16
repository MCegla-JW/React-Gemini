import { useState, useEffect } from 'react'
import './App.css'
import { GoogleGenAI } from '@google/genai'
import Markdown from 'react-markdown'

const App = () => {
  const [responseText, setResponseText] = useState('');
  const [userInput, setUserInput] = useState("")

  console.log(userInput)
  const handleChange = (e) => {
    setUserInput(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page refresh
    try {
      const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY})
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: `Can you give me 3 movie suggestions based on my favourite movie ${userInput}`,
      })
      console.log(userInput)
      setResponseText(response.text)
      console.log(response.text)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Welcome to your movie generator!</h1>
      <h2>What movie have you enjoyed lately? Let me find you similar ones!</h2>
      <label>Enter A Movie Name: </label>
      <input type='text' value={userInput} onChange={handleChange}/>
      <button type="submit">Generate</button>
    </form>
    <Markdown>{responseText}</Markdown>
    </>
  )
};

export default App;