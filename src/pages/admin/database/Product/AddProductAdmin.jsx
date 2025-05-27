import { Link, useNavigate, useParams } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import AdminLayout from "../../AdminLayout/AdminLayout";
import { formatPrice, generateAmountOptions } from "../../../../utils";
import { useDispatch } from "react-redux";
import {
  useAddProductMutation,
  useFetchCategoriesQuery,
  useFetchCompaniesQuery,
  useLazyFetchCategoriesQuery,
  useLazyFetchCompaniesQuery,
  useLazySingleProductQuery,
  useSingleProductQuery,
  useUpdateProductMutation,
} from "../../../../features/api";
import { useAsyncMutation, useErrors } from "../../../../hooks/hook";
import { useEffect, useState } from "react";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ToogleInput from "../../components/Input/ToogleInput";
import axios from "axios";
import { server } from "../../../../features/config";
import { BsCamera, BsCameraFill } from "react-icons/bs";
import FormSelect from "../../../../components/FormSelect";
import toast from "react-hot-toast";

const AddProductAdmin = () => {
  const params = useParams();
  const productId = params.id;

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");
  const [tags, setTags] = useState("");
  const [shipping, setShipping] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState("");

  // const Categories = useFetchCategoriesQuery();
  // const Companies = useFetchCompaniesQuery();
  // const errors = [
  //   { error: Categories?.error, isError: Categories?.isError },
  //   { error: Companies?.error, isError: Companies?.isError },
  // ];
  // useErrors(errors);
  // const categoryData =
  //   Categories?.data?.categories?.filter(
  //     (i) => i?.name?.toString() !== "all"
  //   ) || [];
  // const companyData =
  //   Companies?.data?.companies?.filter((i) => i?.name?.toString() !== "all") ||
  //   [];

  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [company, setCompany] = useState();
  const [category, setCategory] = useState();

  const [extraImages, setExtraImages] = useState([]);
  const [extraImageFiles, setExtraImageFiles] = useState([]);

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if(files.length > 2){
      toast.error("You can upload only 2 extra images");
      return;
    }
    const previews = files.map((file) => URL.createObjectURL(file));
    setExtraImages((prev) => [...prev, ...previews]);
    setExtraImageFiles((prev) => [...prev, ...files]);
  };


  const [fetchCategories] = useLazyFetchCategoriesQuery();
  const [fetchCompanies] = useLazyFetchCompaniesQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetchCategories();
        const res2 = await fetchCompanies();

        const catData = res1?.data?.categories.filter((i) => i.name != "all");
        const comData = res2?.data?.companies.filter((i) => i.name != "all");

        setCategoryData(catData);
        setCompanyData(comData);

        setCategory(catData[0]);
        setCompany(comData[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const [addProductMutation] = useAsyncMutation(useAddProductMutation);

  const addProductHandler = async () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("categoryId", category?._id);
    formdata.append("companyId", company?._id);
    formdata.append("price", Number(price));
    formdata.append("description", description);
    formdata.append("shipping", shipping);
    formdata.append("featured", featured);
    formdata.append("productId", productId);
    formdata.append("colors", colors.split(","));
    formdata.append("tags", tags.split(","));
    formdata.append("avatar", file);

    // Extra images
    extraImageFiles.forEach((file) => {
      formdata.append("files", file);
    });

    await addProductMutation("adding new product ...", formdata);
    navigate("/admin/product");
  };
  

  return (
    <>
      <TitleCard>
        <section>
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <Link to="/admin/product">Products</Link>
              </li>
            </ul>
          </div>
          {/* PRODUCT */}
          <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
            {/* IMAGE */}

            <div>
              <div className="relative mb-2 mt-5">
                <div className="w-66 h-88 lg:w-66 lg:h-66  object-cover rounded-lg">
                  <img
                    src={image || "/default.png"}
                    alt={title}
                    className="w-66 m-1 h-66 object-cover rounded-lg lg:w-full"
                  />
                </div>
                <div className="bg-transparent  right-0 bottom-0 z-3">
                  <BsCameraFill
                    size={"35"}
                    className="absolute bottom-0 right-0.4 p-1 m-0 bg-black rounded"
                  />
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    className="w-9 m-0 p-0 h-8 relative opacity-0  z-5"
                  />
                </div>
              </div>
              <TextAreaInput
                labelTitle="Description"
                defaultValue={description}
                updateFormValue={setDescription}
              />
              <ToogleInput
                updateType="syncData"
                labelTitle="Shipping"
                defaultValue={shipping}
                updateFormValue={setShipping}
              />
              <ToogleInput
                updateType="syncData"
                labelTitle="Featured"
                defaultValue={featured}
                updateFormValue={setFeatured}
              />
            </div>

            {/* PRODUCT */}
            <div>
              {/* Extra Images Upload */}
              <div className="mt-4">
                <label className="block mb-2 font-medium">Extra Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleExtraImagesChange}
                  className="mb-4"
                />
                <div className="flex gap-4 flex-wrap">
                  {extraImages.length ? (
                    extraImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`extra-${idx}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))
                  ) : (
                    <>
                      <img
                        src={ "/default.png"}
                        alt={title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <img
                        src={"/default.png"}
                        alt={title}
                        className="w-24 h-24 object-cover rounded"
                      />
                    </>
                  )}
                </div>
              </div>

              <>
                <InputText
                  labelTitle="Title"
                  defaultValue={title}
                  updateFormValue={setTitle}
                />

                <FormSelect
                  label="category"
                  name="category"
                  list={categoryData}
                  size="select-sm"
                  value={category}
                  setValue={setCategory}
                />
                <FormSelect
                  label="company"
                  name="company"
                  list={companyData}
                  size="select-sm"
                  value={company}
                  setValue={setCompany}
                />
                <InputText
                  labelTitle="Price"
                  defaultValue={price}
                  updateFormValue={setPrice}
                />
                <InputText
                  labelTitle="Color"
                  defaultValue={colors}
                  updateFormValue={setColors}
                />
                <InputText
                  labelTitle="Tags"
                  defaultValue={tags}
                  updateFormValue={setTags}
                />

                <div className="mt-10">
                  <button
                    className="btn btn-secondary btn-md mr-4"
                    onClick={(e) => addProductHandler(e)}
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

export default AdminLayout()(AddProductAdmin);
