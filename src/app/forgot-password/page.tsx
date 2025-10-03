"use client";

export const dynamic = "force-dynamic"; // บังคับ render แบบ client-side

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const forgotSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

interface User {
  email: string;
  password: string; // เพิ่ม field อื่นได้ตามจริง
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotForm) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === data.email);

    if (user) {
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } else {
      alert("ไม่พบอีเมลนี้ในระบบ");
    }
  };
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      
      {/* **Card หลัก: มิติที่ชัดเจน** */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 transform hover:shadow-2xl transition duration-300">
        
        {/* หัวข้อ: ใช้สีเทาเข้มและเส้นแบ่งบาง ๆ */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b border-gray-200 pb-3">
          ลืมรหัสผ่าน
        </h1>
        
        {/* คำแนะนำ: เพิ่มข้อความแนะนำให้ผู้ใช้ทราบว่าต้องทำอะไร */}
        <p className="text-center text-sm text-gray-500 mb-6">
            กรุณากรอกอีเมลที่ใช้ลงทะเบียน เพื่อที่เราจะสามารถส่งลิงก์ตั้งรหัสผ่านใหม่ให้คุณได้
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            {/* Label: ปรับให้เข้มขึ้นเล็กน้อย */}
            <label className="block mb-2 text-sm font-medium text-gray-700">อีเมล</label>
            
            {/* Input Field: สไตล์เส้นขีดด้านล่าง พร้อม Shadow Inner และ Focus Blue-800 */}
            <input
              {...register("email")}
              type="email"
              className="w-full p-3 bg-white border-b border-gray-400 shadow-inner shadow-gray-50/50 rounded-none focus:outline-none focus:border-blue-800 focus:ring-0 transition placeholder-gray-500"
              placeholder="กรอกอีเมลของคุณ"
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* ปุ่ม Submit: ใช้สีเน้น Blue-800 */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition shadow-lg hover:shadow-xl font-semibold tracking-wider transform hover:scale-[1.01] focus:outline-none"
          >
            ต่อไป
          </button>
        </form>
        
        {/* Link กลับไปหน้า Login: ใช้สีเน้น Blue-800 */}
        <p className="mt-6 text-center text-sm text-gray-600">
          กลับไป 
          <a href="/login" className="text-blue-800 hover:text-blue-900 font-medium ml-1 hover:underline transition">
            เข้าสู่ระบบ
          </a>
        </p>
      </div>
    </div>
  );
}
