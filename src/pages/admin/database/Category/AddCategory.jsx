import { useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../../../hooks/hook";
import AdminLayout from "../../AdminLayout/AdminLayout";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { useAddCategoryMutation } from "../../../../features/api";

const AddCategory = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [file, setFile] = useState("");

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const [addCategoryMutation] = useAsyncMutation(useAddCategoryMutation);

  const addCategoryHandler = async () => {
    const formdata = new FormData();

    formdata.append("name", name);
  
    formdata.append("avatar", file);

    await addCategoryMutation("updating category ...", formdata);

    navigate("/admin/category");
  };

  return (
    <>
      <TitleCard>
        <section>
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <Link to="/admin/category">Category</Link>
              </li>
            </ul>
          </div>
          {/* PRODUCT */}
          <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
            {/* IMAGE */}

            <div>
              <div className="relative mb-2 mt-5">
                <div className="w-66 h-88 lg:w-full lg:h-66 bg-white object-cover rounded-lg">
                  <img
                    src={image || "/default.png"}
                    alt={name}
                    className="w-66 m-1 h-66 object-cover rounded-lg lg:w-full"
                  />
                </div>
                <div className="bg-transparent absolute right-0 bottom-0 z-3">
                  <BsCameraFill
                    size={"35"}
                    className="absolute bottom-0 right-0.4 p-1 m-0 bg-black rounded"
                  />
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    className="w-5 m-0 p-0 h-5 relative opacity-0 z-5"
                  />
                </div>
              </div>
            </div>

            {/* PRODUCT */}
            <div>
              <>
                <InputText
                  labelTitle="Name"
                  defaultValue={name}
                  updateFormValue={setName}
                />

                <div className="mt-10">
                  <button
                    className="btn btn-secondary btn-md mr-4"
                    onClick={(e) => addCategoryHandler(e)}
                  >
                    Add
                  </button>
                </div>
              </>
            </div>
          </div>
        </section>
      </TitleCard>
    </>
  );
};

export default AdminLayout()(AddCategory);
