import { useEffect, useState } from 'react';
import { socket } from "./socket"

export default function App() {
  const [ username, setUsername ] = useState<string>();
  const [ message, setMessage ] = useState <string>();
  const [ chat, setChat ] = useState<any>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("conectado ao servidor");
    })
    socket.on("chat_message", (data) => {
      console.log(data);
      setChat((prev: any) => [...prev, data]);
    });
    
    return() => {
      socket.off("chat_message");
    }
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (!username || !message) return;
    socket.emit('chat_message', {username, message});
    setMessage('');
  }

  return (
    <div className="p-6 px-48">
      <h3 className="font-semibold"> chat em tempo real</h3>
      <div className="flex flex-row items-center space-x-4">
        <label htmlFor="for-username">nome</label>
        <input
          className = "border p-1 rounded w-96" 
          type = "text" 
          placeholder="Seu Nome..."
          value = {username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="border-h-[300px] overflow-y-auto p-4 mt-2 bg-gray-100">
          {
            chat.map((msg: any, i: number) => (
              <p key={i}> <strong>{msg.username}: {msg.message}</strong></p>
            ))
          
          }
        </div>
        <form onSubmit={sendMessage}> 
          <div className='flex flex-row items-center space-x-4 mt-4'>
            <input 
              className="border p-1 rounded w-96"
              type="text"
              placeholder="digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className ='border border-sky-800 bg-sky-500 text-white px-4 py-1 rounded hover:bg-sky-400 transition all duration-300 cursor-pointer'
            >enviar</button>
          </div>
        </form>
      </div>
  )
}