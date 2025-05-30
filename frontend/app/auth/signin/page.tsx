import LoginForm from "@/forms/LoginForm";

function Signin() {
    return (
        <div
            className={`min-h-screen flex items-center justify-center text-white`}
        >
            <div
                className={`bg-gray-800 rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden`}
            >
                <div
                    className={`w-full md:w-1/2 flex items-center justify-center p-8`}
                    style={{
                        backgroundImage: `url('/auth.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.8,
                    }}
                >
                    <div className="text-white text-center">
                        <h2 className="text-4xl font-bold mb-4 italic">
                            Enter in your Account
                        </h2>
                    </div>
                </div>

                <div className={`w-full md:w-1/2 p-8`}>
                    <h2 className="text-3xl font-bold mb-6">Sign In</h2>
                    <LoginForm />
                    <p className="text-sm mt-2 text-gray-500 text-center">
                        Have not an account?{" "}
                        <a
                            href="/auth/signup"
                            className="text-yellow-500 hover:underline hover:text-yellow-700"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
