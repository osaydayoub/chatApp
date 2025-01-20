import { useEffect, useRef, useState } from 'react';
import './App.css'
import Message from './components/Message';
import Contact from './components/Contact';
import { BsSearch } from "react-icons/bs";
import { HiOutlineChatAlt2 } from "react-icons/hi";

function App() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string, type: "sender" | "receiver" }[]>([]);
  const [type, setType] = useState<"sender" | "receiver">("sender")
  const [placeholder, setPlaceholder] = useState<string>('Type a message');

  const [searchedContact, setSearchedContact] = useState<string>('');
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>('Search or start a new chat');
  const [contactsToDisplay, setContactsToDisplay] = useState<string[]>([]);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const contacts: string[] = [
    'John Doe',
    'Jane Smith',
    'Emily Davis',
    'Michael Johnson',
    'Sarah Lee',
    'Oliver Brown',
    'Sophia Wilson',
    'Liam Miller',
    'Charlotte Anderson',
    'Benjamin Thomas',
    'Amelia Carter',
    'Ethan Moore',
    'Isabella Taylor',
    'Noah Martinez',
    'Mia Harris'
  ];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }, [messages]);

  useEffect(() => {
    if (searchedContact != '') {
      setContactsToDisplay(contacts.filter((contact) => contact.toLocaleLowerCase().includes(searchedContact.toLocaleLowerCase())))
    } else {
      setContactsToDisplay(contacts); 
    }

  }, [searchedContact])

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
        <h2>Chat App</h2> <HiOutlineChatAlt2 />
      </div>

      <div className='main-chat-container'>
        <div className='contacts-container'>
          <div className="search-container">
            <BsSearch />
            <input
              type="text"
              value={searchedContact}
              placeholder={searchPlaceholder}
              onFocus={() => setSearchPlaceholder('')}
              onBlur={() => !searchedContact && setSearchPlaceholder('Search or start a new chat')}
              onChange={(e) => setSearchedContact(e.target.value)}
            />
          </div>
          <div className='contact-list'>
            {contactsToDisplay.map((contact, index) => (
              <Contact key={index} name={contact} />
            ))}
          </div>


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
