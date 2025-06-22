
export default function MessageBubbleLoader() {
    return (
        <div className="flex justify-start">
            <div className="bg-neon-purple/20 p-3 rounded-lg">
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    )
}