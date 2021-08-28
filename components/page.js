export default function Page({ title, children }) {
    return (
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">{ title }</h1>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    { children }
                </div>
            </div>
        </main>
    )
}
