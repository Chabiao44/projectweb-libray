"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z.string().min(3, "กรุณากรอกชื่อผู้ใช้"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    if (data.username === "admin" && data.password === "123456") {
      // ✅ login ผ่านแล้วเปลี่ยนหน้า
      router.push("/admin");   // เปลี่ยนหน้าไปที่ /admin มันก็ คือ การ Link ไปที่หน้า AdminPage
      alert("ยินดีต้อนรับเข้าสู่ระบบ Admin! 🎉");
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input {...register("username")} placeholder="Username" className="border p-2 w-full mb-2" />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

        <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full mb-2" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
