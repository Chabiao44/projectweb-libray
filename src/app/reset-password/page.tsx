"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";

const resetSchema = z.object({
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัว"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

type ResetForm = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { register, handleSubmit, formState: { errors } } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = (data: ResetForm) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex((u: any) => u.email === email);

    if (index !== -1) {
      users[index].password = data.password;
      localStorage.setItem("users", JSON.stringify(users));
      alert("รีเซ็ตรหัสผ่านสำเร็จ!");
      router.push("/login");
    } else {
      alert("ไม่พบอีเมลนี้ในระบบ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      
      {/* **Card หลัก: มิติที่ชัดเจน** */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 transform hover:shadow-2xl transition duration-300">
        
        {/* หัวข้อ: ตั้งรหัสผ่านใหม่ */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b border-gray-200 pb-3">
          ตั้งรหัสผ่านใหม่
        </h1>
        
        {/* ลบข้อความแนะนำการกรอกอีเมลออก */}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            {/* Label: รหัสผ่านใหม่ */}
            <label className="block mb-2 text-sm font-medium text-gray-700">รหัสผ่านใหม่</label>
            
            {/* Input Field: สไตล์เส้นขีดด้านล่าง พร้อม Shadow Inner และ Focus Blue-800 */}
            <input
              {...register("password")}
              type="password"
              className="w-full p-3 bg-white border-b border-gray-400 shadow-inner shadow-gray-50/50 rounded-none focus:outline-none focus:border-blue-800 focus:ring-0 transition placeholder-gray-500"
              placeholder="รหัสผ่านใหม่"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            {/* Label: ยืนยันรหัสผ่าน */}
            <label className="block mb-2 text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
            
            {/* Input Field: สไตล์เส้นขีดด้านล่าง พร้อม Shadow Inner และ Focus Blue-800 */}
            <input
              {...register("confirmPassword")}
              type="password"
              className="w-full p-3 bg-white border-b border-gray-400 shadow-inner shadow-gray-50/50 rounded-none focus:outline-none focus:border-blue-800 focus:ring-0 transition placeholder-gray-500"
              placeholder="ยืนยันรหัสผ่าน"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* ปุ่ม Submit: ใช้สีเน้น Blue-800 และข้อความ "รีเซ็ตรหัสผ่าน" */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition shadow-lg hover:shadow-xl font-semibold tracking-wider transform hover:scale-[1.01] focus:outline-none"
          >
            รีเซ็ตรหัสผ่าน
          </button>
        </form>
        
        {/* ลบ Link กลับไปหน้า Login ออก */}

      </div>
    </div>
  );
}
