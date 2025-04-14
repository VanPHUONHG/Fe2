import { useForm } from "react-hook-form";
import { User } from "../../inface/user";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>();

  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: User) => {
      await axios.post(`http://localhost:3000/register`, data);
      return data;
    },
    onSuccess: () => {
      alert("Đăng ký thành công!");
      nav("/login");
    },
    onError: (error) => {
      alert("Đăng ký thất bại. Email có thể đã tồn tại.");
      console.error("Đăng ký thất bại:", error);
    }
  });

  const onRes = (data: User) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-50">
      {/* Ảnh bên trái */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[500px] h-[380px] overflow-hidden rounded-3xl shadow-2xl">
          <img
            className="w-full h-full object-cover"
            src="https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif"
            alt="Funny register GIF"
          />
        </div>
      </div>

      {/* Form đăng ký */}
      <div className="md:flex-1 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg p-8 md:p-16 mx-4 my-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-3 text-center">Join Us 🎉</h2>
        <p className="text-gray-500 mb-8 text-center">Create your EXCLUSIVE account now!</p>

        <form onSubmit={handleSubmit(onRes)} className="w-full max-w-sm space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ"
                }
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("password", {
                required: "Password không được để trống"
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg rounded-xl hover:opacity-90 transition-all"
          >
            Register Now 🚀
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-pink-500 font-medium hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
