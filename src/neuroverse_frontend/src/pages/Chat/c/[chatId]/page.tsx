
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatPage() {
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setisLoading] = useState()

    const sendMessage = () => {

    }

    const renderMessages = () => {
        const lines = 100;
        const messages = [];
        for (let i = 1; i <= lines; i++) {
            messages.push(<div key={i}>Chat content goes here</div>);
        }
        return messages;
    };


    return (
        <main className="w-full flex flex-col gap-2 h-screen p-2">
            <ScrollArea className="h-full w-full">
                {renderMessages()}
            </ScrollArea>
            <div className="flex gap-2 w-full">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    disabled={isLoading}
                    className="bg-black/20 border-neon-blue/20 focus:border-neon-blue w-full"
                />
                <Button
                    onClick={sendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-neon-blue/80 hover:bg-neon-blue text-black"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </main>
    )
}