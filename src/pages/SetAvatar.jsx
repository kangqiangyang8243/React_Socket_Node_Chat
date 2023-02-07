import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { AvatarGenerator } from "random-avatar-generator";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const generator = new AvatarGenerator();
  const navigate = useNavigate();
  const params = useParams();

  //   console.log(params.id);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_USER_TOKEN))
      navigate("/login");
  }, []);

  // generate 4 avatars everytime when the pages is loaded
  useEffect(() => {
    const data = [];

    for (let i = 0; i < 4; i++) {
      const res = generator.generateRandomAvatar();
      data.push(res);
    }

    setAvatars(data);
    setIsLoading(false);
  }, []);

  //   console.log(avatars);
  //   console.log(selectedAvatar);

  const handleSetProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      if (params.id) {
        const user = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
        );

        const res = await axios.put(
          process.env.REACT_APP_BASE_URL + `/users/${params.id}`,
          {
            id: user._id,
            avatarImage: avatars[selectedAvatar],
          }
        );

        if (res.data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = res.data.image;
          localStorage.setItem(
            process.env.REACT_APP_USER_TOKEN,
            JSON.stringify(user)
          );
          toast.success("Profile picture set");
          navigate("/");
        } else {
          toast.error("Params id missing");
        }
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#2a2c36] w-full h-screen flex items-center justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto text-white font-serif gap-10 w-full flex flex-col items-center">
          <h1 className="text-lg md:text-2xl font-semibold whitespace-nowrap ">
            Pick an Avatar as your profile picture
          </h1>
          <div className="w-full flex items-center justify-center gap-5 group">
            {avatars.map((avatar, index) => (
              <div
                key={avatar}
                className={`rounded-full border p-[2px] hover:border-blue-600 transform duration-150 ease-linear ${
                  selectedAvatar === index ? `border-2 border-blue-600` : ``
                }`}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className={`w-14 h-14 md:w-20 md:h-20 rounded-full cursor-pointer  `}
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSetProfilePicture}
            className="md:w-[30%] md:text-xl px-4 py-2 whitespace-nowrap rounded-lg  hover:bg-purple-600 bg-purple-400"
          >
            Set as Profile Picture
          </button>
        </div>
      )}
    </div>
  );
}

export default SetAvatar;
