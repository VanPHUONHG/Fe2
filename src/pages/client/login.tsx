import { useMutation } from "@tanstack/react-query";
import { User } from "../../inface/user";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: User) => {
      const res = await axios.post(`http://localhost:3000/login`, data);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("key", data.accessToken);
      alert("Đăng nhập thành công");
      navigate("/");
    },
    onError: () => {
      alert("Email hoặc mật khẩu không đúng");
    }
  });

  const onLogin = (data: User) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      {/* Hình ảnh bên trái */}
      <div className="md:flex-1 flex items-center justify-center p-6">
        <div className="overflow-hidden rounded-3xl shadow-2xl">
          <img
            className="w-[550px] h-auto object-cover"
            src="https://media.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.gif"
            alt="Ảnh đăng nhập vui nhộn"
          />
        </div>
      </div>

      {/* Form đăng nhập */}
      <div className="md:flex-1 flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg p-8 md:p-16">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-3">Welcome Back 👋</h2>
        <p className="text-gray-500 mb-8">Log in to your EXCLUSIVE account</p>

        <form onSubmit={handleSubmit(onLogin)} className="w-full max-w-sm space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("email", {
                required: "Không được để trống email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Vui lòng nhập đúng định dạng email"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("password", {
                required: "Không được để trống password"
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-pink-500 text-white font-semibold text-lg rounded-md hover:bg-pink-600 transition-all"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-between w-full max-w-sm mt-6 text-sm">
          <Link to="#" className="text-pink-500 font-medium hover:underline">
            Quên mật khẩu?
          </Link>
          <Link to="/register" className="text-pink-500 font-medium hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
