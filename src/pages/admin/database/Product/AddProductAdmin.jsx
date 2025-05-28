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
  const [colors, setColors] = useState([]);
  const [tags, setTags] = useState("");
  const [shipping, setShipping] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [company, setCompany] = useState();
  const [category, setCategory] = useState();
  const [extraImages, setExtraImages] = useState([]);
  const [extraImageFiles, setExtraImageFiles] = useState([]);

  const colorOptions = [
    "#FF5733",
    "#33B5FF",
    "#FF33EC",
    "#33FF57",
    "#FFC300",
    "#8E44AD",
    "#34495E",
    "#2ECC71",
    "#F39C12",
    "#E74C3C",
    "#1ABC9C",
    "#D35400",
    "#C0392B",
    "#7F8C8D",
    "#FFFFFF",
    "#000000",
    "#A52A2A",
    "#5F9EA0",
    "#7FFF00",
    "#D2691E",
    "#FF7F50",
    "#6495ED",
    "#DC143C",
    "#00FFFF",
    "#00008B",
    "#008B8B",
    "#B8860B",
    "#A9A9A9",
    "#006400",
    "#BDB76B",
    "#8B008B",
    "#556B2F",
    "#FF8C00",
    "#9932CC",
    "#8B0000",
    "#E9967A",
    "#8FBC8F",
    "#483D8B",
    "#2F4F4F",
    "#00CED1",
    "#9400D3",
    "#FF1493",
    "#00BFFF",
    "#696969",
    "#1E90FF",
    "#B22222",
    "#FFFAF0",
    "#228B22",
    "#FF00FF",
    "#DCDCDC",
    "#F8F8FF",
    "#FFD700",
  ];

  const handleColorToggle = (color) => {
    if (colors.includes(color)) {
      setColors(colors.filter((c) => c !== color));
    } else {
      setColors([...colors, color]);
    }
  };

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) {
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
    colors.forEach((color) => formdata.append("colors", color));
    formdata.append("tags", tags.split(","));
    formdata.append("avatar", file);

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

          <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
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

            <div>
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
                        src={"/default.png"}
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

              <label className="block mb-2 mt-2 font-medium">
                Select Colors
              </label>
              <div className="grid grid-cols-10 gap-1 mb-2">
                {colorOptions.map((color) => (
                  <div
                    key={color}
                    className={`w-7 h-7 rounded-full cursor-pointer border-[1px] border-black ${
                      colors.includes(color) ? "border-black" : "border-white"
                    } hover:border-black`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorToggle(color)}
                    title={color}
                  ></div>
                ))}
              </div>

              <InputText
                labelTitle="Selected Colors"
                defaultValue={colors.join(", ")}
                updateFormValue={(val) =>
                  setColors(val.split(",").map((c) => c.trim()))
                }
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
            </div>
          </div>
        </section>
      </TitleCard>
    </>
  );
};

export default AdminLayout()(AddProductAdmin);
