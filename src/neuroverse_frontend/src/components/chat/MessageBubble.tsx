
import Markdown from "react-markdown"

interface MessageBubbleProps {
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export default function MessageBubble({ message }: {
    message: MessageBubbleProps
}) {
    const { content, timestamp } = message
    return (
        <div
            className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user'
                ? 'bg-neon-blue/20 text-right'
                : 'bg-neon-purple/20'
                }`}
        >
            <div className="text-sm whitespace-pre-wrap">
                <Markdown>
                    {content}
                </Markdown>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">
                {timestamp.toLocaleTimeString()}
            </span>
        </div>

    )
}