import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email()
      .matches(/^(?!.*@[^,]*,)/)
      .required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });

  const onSubmit = async (values) => {
    try {
      let res = await axios.post(
        "https://password-flow-backend.onrender.com/api/user/register",
        values
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("User already Exists");
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div
      className=" mx-auto p-5 mt-5 rounded-3 bg-dark"
      style={{ width: "500px" }}
    >
      <h1 className="text-center mb-4 text-light">Register User</h1>
      <form
        className="p-5 bg-light w-100 mx-auto rounded-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.username}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.email}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.password}</span>
        </div>
        <div className="d-grid ">
          <button type="submit" className="btn btn-success mt-3">
            Register
          </button>
        </div>

        <div className="mt-3">
          <span className="text-muted">
            Already have an account ?{" "}
            <Link
              to="/"
              className="link link-primary text-decoration-underline "
            >
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
