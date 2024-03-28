import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const maxSize = 2000000;

  const handleImageChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!name) {
      validationErrors.name = "username is required";
    }
    if (!phone) {
      validationErrors.phone = "phonenumber is required";
    } else if (phone.length !== 10) {
      validationErrors.phone = "enter correct phonenumber";
    }
    if (!email) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "enter correct email formate";
    }
    if (!password) {
      validationErrors.password = "pasword is required";
    } else if (password.length < 5) {
      validationErrors.password = "password must 6 digit";
    }
    if (maxSize < (imageUrl && imageUrl.size)) {
      validationErrors.imageUrl = "File Too Large max size 2mb";
    }
    setError(validationErrors);
    toast.error(error.name);
    toast.error(error.email);
    toast.error(error.phone);
    toast.error(error.password);
    toast.error(error.imageUrl);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("imageUrl", imageUrl);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const uploadResponse = await axios.post(
          "http://localhost:5000/user/imageupload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = uploadResponse.data.imageUrl;
        // console.log(uploadResponse);

        await axios.post("http://localhost:5000/user/register", {
          name,
          phone,
          email,
          password,
          imageUrl,
        });
        toast.success("user signup successfully");
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
      } catch (err) {
        // console.log(err.response.data);
        toast.error(err.response.data);
      }
      navigate("/login");
    }
  };

  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className=" h-[450px] bg-white flex flex-col gap-3 text-center justify-center items-center mt-10  py-4 w-[350px] shadow-2xl"
      >
        <h2 className="font-bold text-2xl ">Sing Up</h2>
        <div className="">
          {/* <label>username</label> */}
          <input
            className="border text-center p-2 outline-none"
            type="text"
            placeholder="Enter name"
            value={name.trim()}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="">
          {/* <label>phonenumber</label> */}
          <input
            className="border text-center p-2 outline-none"
            type="text"
            placeholder="Enter phone number"
            value={phone.trim()}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <div>
          {/* <label>email-id</label> */}
          <input
            className="border text-center p-2 outline-none"
            type="text"
            placeholder="Enter email"
            value={email.trim()}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          {/* <label>password</label> */}
          <input
            className="border text-center p-2 outline-none"
            type="password"
            placeholder="Enter pasword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
          <input
            className="border p-1"
            type="file"
            accept="image/*"
            required
            placeholder="select photo"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <button
            className="border w-[200px] px-4 py-2 text-white font-bold bg-gray-500 rounded-[50px] shadow-md"
            type="submit"
          >
            REGISTER
          </button>
        </div>
        <div>
          <p className="text-[15px] p-2">allready register user</p>
          <button
            className="border w-[100px] px-2 py-1 text-white font-bold bg-gray-500 rounded-[50px] shadow-md"
            onClick={() => {
              navigate("/login");
            }}
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
