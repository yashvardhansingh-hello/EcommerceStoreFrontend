import { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import {
  useDeleteCategoryMutation,
  useLazyFetchSingleCategoryQuery,
  useUpdateCategoryMutation,
  useUpdateCompanyMutation
} from "../../../../features/api";
import { useAsyncMutation } from "../../../../hooks/hook";
import AdminLayout from "../../AdminLayout/AdminLayout";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";

const SingleCategory = () => {
  const params = useParams();
  const categoryId = params.id;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(true)

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [file, setFile] = useState("");

  const [lazySingleCategory] = useLazyFetchSingleCategoryQuery();

  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true);

      try {
        const res = await lazySingleCategory(categoryId);

        const p = res.data.category;

        setName(p.name);
        setImage(p.image.url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [refetch]);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const [updateCategoryMutation] = useAsyncMutation(useUpdateCategoryMutation);

  const updateCategoryHandler = async () => {
    const formdata = new FormData();

    formdata.append("name", name);

    formdata.append("categoryId", categoryId);

    if (file) formdata.append("avatar", file);

    await updateCategoryMutation("updating category ...", formdata);
    setRefetch(!refetch);
  };

  const [deleteCategoryMutation] = useAsyncMutation(useDeleteCategoryMutation);
  const deleteCategoryHandler = async () => {
    await deleteCategoryMutation("deleting category ...", categoryId);
    navigate("/admin/category");
  };

  return isLoading ? <Loading /> : (
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
                <img
                  src={image}
                  alt={name}
                  className="w-66 m-1 h-66 object-cover rounded-lg lg:w-full"
                />
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
                    onClick={(e) => updateCategoryHandler(e)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary btn-md mr-4"
                    onClick={(e) => deleteCategoryHandler(e)}
                  >
                    Delete
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

export default AdminLayout()(SingleCategory);
