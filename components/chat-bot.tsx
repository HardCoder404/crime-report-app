"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { GoogleGenerativeAI } from "@google/generative-ai"

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ id: number; content: string; role: string }[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [isTyping, setIsTyping] = useState(false)


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const fetchGeminiResponse = async (message: string) => {
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is missing from environment variables.")
            return "Error: Missing API Key."
        }

        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            const result = await model.generateContent(message)
            return result.response.text()
        } catch (error) {
            console.error("Error fetching response:", error)
            return "Sorry, I couldn't process your request."
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!input.trim()) return

        const newUserMessage = { id: messages.length + 1, content: input, role: "user" }
        setMessages((prev) => [...prev, newUserMessage])
        setInput("")
        setIsLoading(true)
        setIsTyping(true)

        const botResponse = await fetchGeminiResponse(input)
        const newBotMessage = { id: messages.length + 2, content: botResponse, role: "bot" }

        setMessages((prev) => [...prev, newBotMessage])
        setIsLoading(false)
        setIsTyping(false)
    }

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen ? (
                <Card className="w-80 sm:w-96 shadow-lg overflow-hidden border border-gray-800 bg-gray-900 text-white">
                    <div className="flex items-center justify-between p-3.5 pl-5 border-b border-gray-800 bg-gray-950">
                        <div className="flex items-center space-x-2">
                            <img src="/bot.svg" alt="Chat Icon" className="w-10 h-10 text-sky-500" />
                            <div>
                             <span className="font-medium">SafeReport Assistant</span>
                             {
                                input || isTyping ? 
                             <h1 className="text-xs flex items-center gap-1 text-green-400"><h2 className="w-2 h-2 bg-green-400 rounded-full"></h2>  Online
                             </h1> : <div className="text-xs text-gray-500">Offline</div>
                             }
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 hover:text-white w-8 rounded-full hover:bg-gray-800">
                            <X size={18} />
                        </Button>
                    </div>

                    <CardContent className="p-5 h-80 overflow-y-auto bg-gray-950/50">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-3">
                                <img src="/bot.svg" alt="Chat Icon" className="w-20 h-20 text-sky-500" />
                                <p>How can I help you with SafeReport today?</p>
                            </div>
                        ) : (
                            
                            <>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn(
                                            "mb-3 max-w-fit min-w-20 p-3",
                                            message.role === "user" ? "ml-auto bg-sky-600 rounded-l-2xl rounded-b-2xl text-white" : "bg-gray-800 rounded-r-2xl rounded-b-2xl text-gray-100",
                                        )}
                                    >
                                        {message.content}
                                    </div>
                                ))}
                                {/* Typing Indicator Animation */}
                                {isTyping && (
                                    <div className="flex items-center space-x-2 bg-gray-800 text-gray-100 p-2.5 px-4 rounded-full w-fit animate-pulse">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>

                    <CardFooter className="p-3 border-t border-gray-800 bg-gray-950">
                        <form onSubmit={onSubmit} className="flex w-full space-x-2">
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="flex-grow bg-gray-800 px-5 rounded-full border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-sky-500"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !input.trim()}
                                className="bg-sky-600 rounded-full px-5 hover:bg-sky-700 text-white"
                            >
                                <Send size={18} />
                                {/* {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} */}
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    onClick={toggleChat}
                    className="h-14 w-14 rounded-full bg-sky-600 hover:bg-sky-700 shadow-lg flex items-center justify-center"
                >
                    <MessageCircle size={24} className="text-white" />
                </Button>
            )}
        </div>
    )
}
