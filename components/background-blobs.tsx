export function BackgroundBlobs() {
    return (
        <div className="fixed inset-0 -z-10 bg-background pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-blob" />
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-800/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        </div>
    )
}
