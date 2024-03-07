export default function Login() {

    return (
        <form className="space-y-4">
            <input
                type="text"
                placeholder="Username"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-teal-500"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-teal-500"
            />
            <button
                type="submit"
                className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 transition duration-300 focus:outline-none"
            >
                Login
            </button>
        </form>
    );
}