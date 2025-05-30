"use client";
import { motion } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiChevronRight, FiClock, FiSend } from "react-icons/fi";

function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-screen h-screen">
            <svg
                id="visual"
                className="w-full h-full fixed top-0 left-0"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 900 600"
                preserveAspectRatio="none"
            >
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="rgb(66,66,66,0.1)"
                ></rect>
                <path
                    d="M0 369L30 364.8C60 360.7 120 352.3 180 333C240 313.7 300 283.3 360 267.3C420 251.3 480 249.7 540 267.8C600 286 660 324 720 342.8C780 361.7 840 361.3 870 361.2L900 361L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z"
                    fill="rgb(255,255,255,0.1)"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                ></path>
            </svg>

            <div className="min-h-screen text-white font-sans antialiased">
                <motion.div
                    animate={{
                        backgroundColor: isScrolled
                            ? "rgba(17, 24, 39, 0.95)"
                            : "rgba(17, 24, 39, 0)",
                        backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
                        boxShadow: isScrolled
                            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                            : "none",
                    }}
                    transition={{ duration: 0.3 }}
                    className="fixed w-full z-50"
                >
                    <Header router={router} />
                </motion.div>

                <div className="pt-16 z-100">
                    <HeroSection />
                    <FeaturesSection />
                    <CtaSection router={router} />
                </div>

                <Footer />
            </div>
        </div>
    );
}

const Header = ({ router }: { router: AppRouterInstance }) => (
    <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 px-4 sm:px-8 lg:px-12 flex justify-between items-center"
    >
        <div className="flex items-center space-x-2">
            <img
                className="mr-4"
                src="./logo.png"
                alt="logo"
                width={50}
                height={50}
            />
            <span className="text-white font-bold text-xl flex">Calmon</span>
        </div>

        <button
            onClick={() => router.push("/auth/signup")}
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
            Get Started
        </button>
    </motion.header>
);

const HeroSection = () => {
    return (
        <section className="py-12 px-4 sm:px-8 lg:px-12">
            <div className="mx-auto mb-8 z-10 relative justify-center text-center">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                    Nice ui and powerful{" "}
                    <span className="text-blue-400">ecosystem</span> for
                    scheduling
                </h1>
                <p
                    className="sm:text-sm md:text-lg p-8 md:px-16 lg:px-32 text-gray-500 font-bold"
                    style={{ fontStyle: "italic" }}
                >
                    Calmon is your assistant that simplifies scheduling,
                    optimizes your time, and lets you focus on what truly
                    matters. Seamlessly integrated.
                </p>
            </div>
            <video
                src="/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-xl"
            />
        </section>
    );
};

const FeaturesSection = () => {
    const features = [
        {
            title: "Smart Scheduling",
            description:
                "AI learns your preferences and schedules meetings at optimal times.",
            icon: <FiClock className="w-8 h-8 text-blue-400" />,
        },
        {
            title: "Natural Language",
            description:
                "Simply tell your AI assistant what you need in plain English.",
            icon: <FiSend className="w-8 h-8 text-blue-400" />,
        },
        {
            title: "Time Optimization",
            description:
                "Automatically finds the best time slots based on your habits.",
            icon: <FiCheckCircle className="w-8 h-8 text-blue-400" />,
        },
    ];

    return (
        <section className="py-16 px-4 sm:px-8 lg:px-12 bg-gray-950">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Powerful <span className="text-blue-400">Features</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Designed to save you time and reduce scheduling
                        headaches.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="bg-gray-900 rounded-xl p-8 hover:shadow-lg transition-all"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CtaSection = (
    { router }: { router: AppRouterInstance }, // Принимаем router
) => (
    <section className="py-20 px-4 sm:px-8 lg:px-12 bg-gradient-to-br from-blue-950 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
            <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Ready to Transform Your Scheduling?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    Join thousands of professionals who save hours every week
                    with Calmon.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => router.push("/signup")} // Добавляем onClick
                        className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors flex items-center justify-center"
                    >
                        Get Started <FiChevronRight className="ml-2 w-5 h-5" />
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-sm">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row justify-between items-center"
            >
                <p>© {new Date().getFullYear()} Calmon. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Cookies
                    </a>
                </div>
            </motion.div>
        </div>
    </footer>
);

export default LandingPage;
