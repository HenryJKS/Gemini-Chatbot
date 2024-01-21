import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  console.log(messages);

  // Send a GET request to the backend
  const getResponse = async () => {
    const response = await fetch(`http://localhost:8000/prompt/${text}`);

    const data = await response.json();
    console.log(data);

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
    // <div className="chatbot">
    //   <div className="chat-header">
    //     <div className="info-container">
    //       <h3>Chat with</h3>
    //       <h2>Gemini Bot</h2>
    //     </div>
    //   </div>
    //   <div className="feed">
    //     {messages?.map((message, _index) => (
    //       <div key={_index}>
    //         <div className="question bubble">{message.author}</div>
    //         <div className="response bubble">{message.bot}</div>
    //       </div>
    //     ))}
    //   </div>
    //   <textarea value={text} onChange={(e) => setText(e.target.value)} />
    //   <button onClick={getResponse}>➔</button>
    // </div>

    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <Card className="border rounded border-primary w-50">
        <Card.Header className="cardheader text-center">GeminiBot</Card.Header>
        <Card.Body>
          <Card.Text className="cardtext">
            {messages?.map((message, _index) => (
              <div key={_index}>
                <div className="question bubble">{message.author}</div>
                <div className="response bubble">{message.bot}</div>
              </div>
            ))}
          </Card.Text>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control"
            rows="3"
          />
          <Button
            onClick={getResponse}
            className="btn btn-primary mt-3"
            style={{ width: "100%" }}
          >
            Send
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;
