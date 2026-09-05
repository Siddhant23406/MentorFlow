import { useState } from "react" 
import { useEffect } from 'react'
import './App.css'  

function App() {
  const [sessionId, setSessionId] = useState(null)
  const [messages, setMessages] = useState([{ sender: "mentor", text: "Hi! Ready to work on a problem?" }])
  const [inputText, setInputText] = useState("")
  const [problemTitle, setProblemTitle] = useState("")
  const [problemDescription, setProblemDescription] = useState("")

  useEffect(() => { 
  async function createSession() {
    const response = await fetch("http://localhost:3000/")
    const data = await response.json()
    setSessionId(data.sessionId)
    setProblemTitle(data.title)
    setProblemDescription(data.description)
  }
  createSession()
}, [])
  async function handleSend() {
  const studentMsg = { sender: "student", text: inputText }
  const updatedMessages = [...messages, studentMsg]
  setMessages(updatedMessages)
  setInputText("")

  const response = await fetch(`http://localhost:3000/session/${sessionId}/respond`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentMessage: inputText })
  })
  const data = await response.json()

  const mentorMsg = { sender: "mentor", text: data.response }
  setMessages([...updatedMessages, mentorMsg])
}

  return (
  <>
 <div className="chat-container">
  <h2>{problemTitle}</h2>
  <p>{problemDescription}</p>
  {messages.map((msg, index) => (
    <p key={index} className={msg.sender === 'student' ? "message student" : "message mentor"}>{msg.text}</p>
  ))}
</div>
<div className="input-bar">
  <input
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
  />
  <button onClick={handleSend}>Send</button>
</div>
</>

  )
}

export default App
