import { useEffect, useRef, useState } from 'react';
import './App.css'
import Message from './components/Message';
import Contact from './components/Contact';

function App() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string, type: "sender" | "receiver" }[]>([]);
  const [type, setType] = useState<"sender" | "receiver">("sender")
  const [placeholder, setPlaceholder] = useState<string>('Type a message');

  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const contacts: string[] = ['John Doe', 'Jane Smith', 'Emily Davis', 'Michael Johnson', 'Sarah Lee'];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }, [messages]);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: message, type: type === "sender" ? "receiver" : "sender" }]);
      setMessage('');
      setPlaceholder('Type a message');
    }
    setType((currentType) => {
      if (currentType === "sender") {
        return "receiver";
      } else {
        return "sender";
      }
    })
  };

  return (
    <div>
      <div className='header-container'>
        <h1>Chat App</h1>
      </div>

      <div className='main-chat-container'>
        <div className='contacts-container'>
          {contacts.map((contact, index) => (
            <Contact key={index} name={contact} />
          ))}

        </div>
        <div className='messages-container'>
          <div className='messages'>
            {messages.map((msg, index) => (
              <Message ref={index === messages.length - 1 ? lastMessageRef : null} key={index} message={msg.text} messageType={msg.type} />
            ))}
          </div>
          <form className="input-container" onSubmit={submitHandler}>
            <input type='text' value={message}
              placeholder={placeholder}
              onFocus={() => setPlaceholder('')}
              onBlur={() => !message && setPlaceholder('Type a message')}
              onChange={(e) => setMessage(e.target.value)}>
            </input>

            <button className='btn'>Send</button>
          </form>
        </div>


      </div>



    </div>
  )
}

export default App
