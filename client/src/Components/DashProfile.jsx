import {
  Alert,
  Button,
  Modal,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB & it must be an image file)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    const requiredFields = [
      "name",
      "number",
      "age",
      "bloodGroup",
      "education",
      "facebook",
    ];

    for (const field of requiredFields) {
      if (!formData[field] && !currentUser[field]) {
        setUpdateUserError("Please fill in all required fields.");
        return;
      }
    }

    if (!imageFileUrl && !currentUser.profilePicture) {
      setUpdateUserError("Please upload a profile picture.");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to upload.");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-2xl lg:text-3xl mt-5 font-semibold font-serif text-center pb-4">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[#81b619] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email Address"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <label className="text-xl font-semibold text-center">
          Join Shariya today and start your journey towards a blessed and
          meaningful marriage. Connect with like-minded individuals and find
          your perfect match guided by faith and mutual respect.
        </label>
        <TextInput
          type="text"
          id="name"
          placeholder="Your Name"
          defaultValue={currentUser.name}
          onChange={handleChange}
          required
        />
        <TextInput
          type="number"
          id="number"
          placeholder="Phone Number"
          defaultValue={currentUser.number}
          onChange={handleChange}
          required
        />
        <div className="flex flex-wrap gap-4 justify-between">
          <Select
            id="gender"
            value={formData.gender || currentUser.gender || ""}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <Select
            id="occupation"
            value={formData.occupation || currentUser.occupation || ""}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select your Occupation</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Engineer">Engineer</option>
            <option value="Doctor">Doctor</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Nurse">Nurse</option>
            <option value="Artist">Artist</option>
            <option value="Musician">Musician</option>
            <option value="Writer">Writer</option>
            <option value="Designer">Designer</option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
            <option value="Salesperson">Salesperson</option>
            <option value="Accountant">Accountant</option>
            <option value="Chef">Chef</option>
            <option value="Photographer">Photographer</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Scientist">Scientist</option>
            <option value="Consultant">Consultant</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Driver">Driver</option>
            <option value="Farmer">Farmer</option>
            <option value="Police Officer">Police Officer</option>
            <option value="Firefighter">Firefighter</option>
            <option value="Military Personnel">Military Personnel</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div className="flex flex-wrap gap-4 justify-between">
          <TextInput
            type="number"
            id="age"
            placeholder="Age"
            defaultValue={currentUser.age}
            onChange={handleChange}
            required
          />
          <Select
            id="bloodGroup"
            value={formData.bloodGroup || currentUser.bloodGroup || ""}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </Select>
        </div>
        <Select
          id="race"
          value={formData.race || currentUser.race || ""}
          onChange={handleSelectChange}
          required
        >
          <option value="">Select your race</option>
          <option value="American Indian">American Indian</option>
          <option value="Asian">Asian</option>
          <option value="Black">Black</option>
          <option value="Latino">Latino</option>
          <option value="Native Hawlian">Native Hawlian</option>
          <option value="White">White</option>
        </Select>
        <div className="flex flex-wrap gap-4 justify-between">
          <Select
            id="height"
            value={formData.height || currentUser.height || ""}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select your Height</option>
            {Array.from({ length: 37 }, (_, i) => {
              const feet = Math.floor((48 + i) / 12);
              const inches = (48 + i) % 12;
              return (
                <option key={i} value={`${feet}'${inches}`}>
                  {`${feet}'${inches}`}
                </option>
              );
            })}
          </Select>

          <Select
            id="weight"
            value={formData.weight || currentUser.weight || ""}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select your weight</option>
            {Array.from({ length: 80 }, (_, i) => {
              const weight = 40 + i * 1;
              return (
                <option key={weight} value={weight}>
                  {weight} kg
                </option>
              );
            })}
          </Select>
        </div>
        <TextInput
          type="date"
          id="date"
          value={currentUser.date}
          onChange={handleChange}
          required
        />
        <div className="flex flex-wrap gap-4 justify-between">
          <TextInput
            type="text"
            id="father"
            placeholder="Father"
            defaultValue={currentUser.father}
            onChange={handleChange}
            required
          />
          <TextInput
            type="text"
            id="mother"
            placeholder="Mother"
            defaultValue={currentUser.mother}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-between">
          <Select
            id="PermanentDivision"
            value={
              formData.PermanentDivision || currentUser.PermanentDivision || ""
            }
            onChange={handleSelectChange}
            required
          >
            <option value="">Select Permanent Division</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Chittagong">Chittagong</option>
          </Select>
          <Select
            id="PresentDivision"
            value={
              formData.PresentDivision || currentUser.PresentDivision || ""
            }
            onChange={handleSelectChange}
            required
          >
            <option value="">Select Present Division</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Chittagong">Chittagong</option>
          </Select>
        </div>
        <Select
          id="education"
          value={formData.education || currentUser.education || ""}
          onChange={handleSelectChange}
          required
        >
          <option value="">Select Education Level</option>
          <option value="Secondary School Certificate">
            Secondary School Certificate
          </option>
          <option value="Higher Secondary Certificate">
            Higher Secondary Certificate
          </option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
          <option value="Doctorate">Doctorate</option>
        </Select>
        <TextInput
          type="text"
          id="facebook"
          placeholder="Facebook Profile URL"
          defaultValue={currentUser.facebook}
          onChange={handleChange}
          required
        />
        <TextInput
          type="text"
          id="linkedIn"
          placeholder="LinkedIn Profile URL"
          defaultValue={currentUser.linkedIn}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="website"
          placeholder="Website/Portfolio URL"
          defaultValue={currentUser.website}
          onChange={handleChange}
        />
        <div>
          <label className="text-xl font-semibold text-center">
            Expected Partners details:
          </label>
          <TextInput
            type="number"
            id="expectedAge"
            placeholder="Expected Age"
            defaultValue={currentUser.expectedAge}
            onChange={handleChange}
            required
          />
          <div className="flex flex-wrap gap-4 justify-between">
            <Select
              id="expectedHeight"
              value={formData.expectedHeight || currentUser.expectedHeight || ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select Expected Height</option>
              {Array.from({ length: 37 }, (_, i) => {
                const feet = Math.floor((48 + i) / 12);
                const inches = (48 + i) % 12;
                return (
                  <option key={i} value={`${feet}'${inches}`}>
                    {`${feet}'${inches}`}
                  </option>
                );
              })}
            </Select>

            <Select
              id="expectedWeight"
              value={formData.expectedWeight || currentUser.expectedWeight || ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select Expected Weight</option>
              {Array.from({ length: 80 }, (_, i) => {
                const weight = 40 + i * 1;
                return (
                  <option key={weight} value={weight}>
                    {weight} kg
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
        <Button
          outline
          gradientDuoTone="greenToBlue"
          type="submit"
          className="text-xl font-semibold"
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update Profile"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              gradientDuoTone="greenToBlue"
              className="text-xl font-semibold w-full"
            >
              Create a Post
            </Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between text-red-500 my-4">
        <Button
          onClick={() => setShowModal(true)}
          className="text-red-500 font-semibold"
          color="none"
        >
          Delete Account
        </Button>
        <Button
          onClick={handleSignout}
          className="text-red-500 font-semibold"
          color="none"
        >
          Sign Out
        </Button>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <div>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
