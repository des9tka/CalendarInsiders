"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useUserStore } from "@/lib/stores/userStore";
import { loginFormData, loginSchema } from "@/validators/authValidators";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();

    const { login } = useUserStore();

    const onSubmit = (data: loginFormData) => {
        login(data.email, data.password, router);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block mb-1 text-gray-500">Email</label>
                <input
                    type="email"
                    {...register("email")}
                    className="px-4 w-full p-2 rounded-xl bg-gray-900 text-white "
                />
                {errors.email && (
                    <p className="text-red-300 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-gray-500">Password</label>
                <input
                    type="password"
                    {...register("password")}
                    className="px-4 w-full p-2 rounded-xl bg-gray-900 text-white"
                />
                {errors.password && (
                    <p className="text-red-300 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="flex items-center justify-center w-full content-center">
                <button
                    type="submit"
                    className={`w-1/2 py-2 px-4 text-white transition-colors bg-gray-900 rounded-xl mt-8 hover:scale-101 hover:bg-black`}
                >
                    Sign In
                </button>
            </div>
        </form>
    );
}
