import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Define response mappings outside the component for clarity and performance
const responseMappings = [
    {
        keywords: ["hello", "hi", "hey", "greetings"],
        getResponse: () => "Hello! How can I help you today? You can ask about products, gaming, accessories, or office laptops."
    },
    {
        keywords: ["products", "shop", "buy", "items", "browse", "all items"],
        getResponse: () => (
            <>
                You can explore all our products on the <Link to="/" className="text-warning fw-bold">Products Page</Link>.
                Are you interested in a specific category like <Link to="/gaming" className="text-warning fw-bold">gaming laptops</Link>, <Link to="/Accessories" className="text-warning fw-bold">accessories</Link>, or <Link to="/normal" className="text-warning fw-bold">office laptops</Link>?
            </>
        )
    },
    {
        keywords: ["gaming", "game", "playstation", "xbox", "pc gaming"],
        getResponse: () => (
            <>
                Awesome! For high-performance gaming, check out our <Link to="/gaming" className="text-warning fw-bold">Gaming Laptops and Setups</Link>.
            </>
        )
    },
    {
        keywords: ["accessories", "parts", "mouse", "keyboard", "headset"],
        getResponse: () => (
            <>
                We have a wide range of <Link to="/Accessories" className="text-warning fw-bold">Accessories</Link> to enhance your setup.
            </>
        )
    },
    {
        keywords: ["office", "normal", "work", "business", "everyday laptop"],
        getResponse: () => (
            <>
                For work, study, or everyday use, explore our collection of <Link to="/normal" className="text-warning fw-bold">Office and Normal Laptops</Link>.
            </>
        )
    },
    {
        keywords: ["add product", "upload product", "new item"], // Assuming this is for admins
        getResponse: () => (
            <>
                If you are an administrator, you can manage products via the <Link to="/addproduct" className="text-warning fw-bold">Add Product Page</Link>.
            </>
        )
    },
    {
        keywords: ["help", "support", "issue", "problem", "contact"],
        getResponse: () => (
            <>
                I can help with general questions. For specific support, please email us at <a href="mailto:contact@novelmoviehub.com" className="text-warning fw-bold">contact@novelmoviehub.com</a> or visit our contact section in the footer.
            </>
        )
    },
    {
        keywords: ["price", "cost", "how much", "pricing"],
        getResponse: () => (
            <>
                You can find detailed pricing for each item on their respective product pages. Start by visiting our <Link to="/" className="text-warning fw-bold">main Products Page</Link>.
            </>
        )
    },
    {
        keywords: ["thanks", "thank you", "appreciate it", "ok"],
        getResponse: () => "You're welcome! Is there anything else I can help you with today?"
    },
    {
        keywords: ["bye", "goodbye", "see ya", "later"],
        getResponse: () => "Goodbye! Feel free to reach out if you have more questions later. Have a great day!"
    }
];

const defaultResponse = () => (
    <>
        I'm still learning and might not have the answer to that. Can you try rephrasing?
        Otherwise, you can always browse our <Link to="/" className="text-warning fw-bold">Products Page</Link> for more information.
    </>
);

const generateBotResponse = (userInput) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const normalizedInput = userInput.toLowerCase().trim();

    for (const mapping of responseMappings) {
        if (mapping.keywords.some(keyword => normalizedInput.includes(keyword))) {
            return { sender: "bot", text: mapping.getResponse(), timestamp };
        }
    }
    return { sender: "bot", text: defaultResponse(), timestamp };
};

const initialBotMessage = {
    sender: "bot",
    text: (
        <>
            Hello! I'm your virtual assistant. How can I help you today?
            You can ask about <Link to="/" className="text-warning fw-bold">products</Link>, <Link to="/gaming" className="text-warning fw-bold">gaming gear</Link>, <Link to="/Accessories" className="text-warning fw-bold">accessories</Link>, or <Link to="/normal" className="text-warning fw-bold">office laptops</Link>.
        </>
    ),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const ChatBot = () => {
    const [messages, setMessages] = useState([initialBotMessage]);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef(null);

    const handleSendMessage = () => {
        const trimmedInput = input.trim();
        if (trimmedInput === "") return;

        const userMessage = {
            sender: "user",
            text: trimmedInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // Simulate bot response
        setTimeout(() => {
            const botMessage = generateBotResponse(trimmedInput);
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);
    };

    useEffect(() => {
        // Auto scroll to bottom
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="container my-4">
            <h2 className="text-center mb-3">💬 Chat with Us</h2>
            <div className="card shadow p-3">
                <div
                    ref={chatBoxRef}
                    className="chat-box border rounded bg-light"
                    style={{ height: "400px", overflowY: "auto", padding: "10px" }}
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-3 ${message.sender === "user" ? "text-end" : "text-start"}`}
                        >
                            <div
                                className={`d-inline-block px-3 py-2 rounded-pill ${
                                    message.sender === "user" ? "bg-primary text-white" : "bg-secondary text-white"
                                }`}
                                style={{ maxWidth: "75%" }}
                            >
                                <div>{message.text}</div>
                                <small className="d-block text-end text-light opacity-75">
                                    {message.timestamp}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="input-group mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                        aria-label="Chat message input"
                    />
                    <button className="btn btn-primary" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
            <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-secondary">
                    ⬅ Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ChatBot;
