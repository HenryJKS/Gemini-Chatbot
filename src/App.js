import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // Send a GET request to the backend
  const getResponse = async () => {
    const response = await fetch(`http://localhost:8000/prompt/${text}`);

    const data = await response.json();

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content
    ) {
      setMessages([
        ...messages,
        {
          author: data.messages[0].content,
          bot: data.candidates[0].content,
        },
      ]);
    } else {
      setMessages([
        ...messages,
        {
          author: data.messages[0].content,
          bot: "Sorry, I don't understand.",
        },
      ]);
    }
  };

  return (
    <div className="principal d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card className="w-50" style={{background: 'rgba(255, 255, 255, 0.15)', borderRadius:'16px',boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(3.8px)', borderColor: 'black', WebkitBackdropFilter: 'blur(3.8px)'}}>
        <Card.Header className="cardheader text-center" style={{color: '#fff'}}>GeminiBot</Card.Header>
        <Card.Body>
          <Card.Text className="cardtext" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {messages?.map((message, _index) => (
              <div key={_index}>
                <div style={{ width: '100%', textAlign: 'left'}}>
                  <div className="question bubble border rounded border-success" style={{ display: 'inline-block', margin: "1%", padding: "1%", color: "#fff"}}>User: {message.author}</div>
                </div>
                <div style={{ width: '100%', textAlign: 'right' }}>
                  <div className="response bubble border rounded border-info" style={{ display: 'inline-block', margin: "1%", padding: "1%", color: "#fff"}}>GeminiBot: {message.bot}</div>
                </div>
              </div>
            ))}
          </Card.Text>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control"
            rows="1"
          />
          <button
            onClick={getResponse}
            disabled={!text}
            className="mt-3"
            style={{margin: "auto", justifyContent: "center", justifyItems: "center", display: "flex"}}>
            <span>➛ Send</span>
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;
