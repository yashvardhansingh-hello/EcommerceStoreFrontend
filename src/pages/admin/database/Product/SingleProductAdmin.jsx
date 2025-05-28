import { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormSelect from "../../../../components/FormSelect";
import Loading from "../../../../components/Loading";
import {
  useDeleteProductMutation,
  useFetchCategoriesQuery,
  useFetchCompaniesQuery,
  useLazySingleProductAdminQuery,
  useUpdateProductMutation,
} from "../../../../features/api";
import { useAsyncMutation, useErrors } from "../../../../hooks/hook";
import { formatPrice } from "../../../../utils";
import AdminLayout from "../../AdminLayout/AdminLayout";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ToogleInput from "../../components/Input/ToogleInput";

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

const SingleProductAdmin = () => {
  const params = useParams();
  const productId = params.id;

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [product, setProduct] = useState(null);

  const dollarsAmount = formatPrice(product?.price || 14000);

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState([]);

  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [shipping, setShipping] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState(null);

  const [extraImages, setExtraImages] = useState([]);
  const [extraImageFiles, setExtraImageFiles] = useState([]);

  const [productColor, setProductColor] = useState(null);

  const [lazySingleProductFetch] = useLazySingleProductAdminQuery();

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
    setExtraImages(previews);
    setExtraImageFiles(files);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const res = await lazySingleProductFetch(productId);

        const p = res?.data?.product;

        if (p) {
          setProduct(p);
          setTitle(p.title || "");
          setPrice(p.price || "");
          setCompany(p.company || "");
          setCategory(p.category || "");
          setDescription(p.description || "");
          setShipping(Boolean(p.shipping));
          setFeatured(Boolean(p.featured));
          setTags(Array.isArray(p.tags) ? p.tags.join(",") : "");
          setColors(Array.isArray(p.colors) ? p.colors : []);
          setProductColor(
            Array.isArray(p.colors) && p.colors.length > 0 ? p.colors[0] : null
          );
          setImage(p.image?.url || "");
          setExtraImages(
            Array.isArray(p.extraImages) ? p.extraImages.map((i) => i.url) : []
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [editMode, lazySingleProductFetch, productId]);

  const Categories = useFetchCategoriesQuery();
  const Companies = useFetchCompaniesQuery();

  const errors = [
    { error: Categories?.error, isError: Categories?.isError },
    { error: Companies?.error, isError: Companies?.isError },
  ];
  useErrors(errors);

  const categoryData =
    Categories?.data?.categories?.filter(
      (i) => i?.name?.toString() !== "all"
    ) || [];
  const companyData =
    Companies?.data?.companies?.filter((i) => i?.name?.toString() !== "all") ||
    [];

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const [updateProductMutation] = useAsyncMutation(useUpdateProductMutation);

  const updateProductHandler = async () => {
    try {
      const formdata = new FormData();

      formdata.append("title", title);
      formdata.append("categoryId", category?._id || "");
      formdata.append("companyId", company?._id || "");
      formdata.append("price", Number(price));
      formdata.append("description", description);
      formdata.append("shipping", shipping);
      formdata.append("featured", featured);
      formdata.append("productId", productId);
      formdata.append(
        "tags",
        JSON.stringify(
          tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        )
      );
      colors.forEach((color) => formdata.append("colors", color));

      if (file) formdata.append("avatar", file);

      extraImageFiles.forEach((file) => {
        formdata.append("files", file);
      });

      await updateProductMutation("updating product ...", formdata);

      setEditMode(false);
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
    }
  };

  const [deleteProductMutation] = useAsyncMutation(useDeleteProductMutation);
  const deleteProductHandler = async () => {
    try {
      await deleteProductMutation("deleting product ...", productId);
      navigate("/admin/product");
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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

          {editMode ? (
            <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
              {/* IMAGE */}
              <div>
                <div className="relative mb-2 mt-5">
                  <img
                    src={image}
                    alt={product?.title || "product image"}
                    className="w-66 m-1 h-66 object-cover rounded-lg lg:w-full"
                  />
                  <div className="bg-transparent absolute right-0 bottom-0 z-3">
                    <BsCameraFill
                      size={35}
                      className="absolute bottom-0 right-0.4 p-1 m-0 bg-black rounded"
                    />
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-5 m-0 p-0 h-5 relative opacity-0 z-5 cursor-pointer"
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
                    {extraImages?.map((img, idx) => (
                      <img
                        key={idx}
                        src={img || "/default.png"}
                        alt={`extra-${idx}`}
                        className="w-34 h-24 object-cover rounded"
                      />
                    ))}
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
                      className={`w-7 h-7 rounded-full cursor-pointer border-[1px] ${
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
                    setColors(
                      val
                        .split(",")
                        .map((c) => c.trim())
                        .filter(Boolean)
                    )
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
                    onClick={updateProductHandler}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary btn-md mr-4"
                    onClick={deleteProductHandler}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary btn-md"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
              {/* IMAGE */}
              <div>
                <img
                  src={product?.image?.url || ""}
                  alt={product?.title || "product image"}
                  className="w-66 m-1 h-66 object-cover rounded-lg lg:w-full"
                />
                <div className="p-3 flex gap-4 flex-wrap">
                  {extraImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`extra-${idx}`}
                      className="w-34 h-24 object-cover rounded"
                    />
                  ))}
                </div>

                <ToogleInput
                  updateType="syncData"
                  labelTitle="Shipping"
                  defaultValue={shipping}
                  // readonly in view mode
                />
                <ToogleInput
                  updateType="syncData"
                  labelTitle="Featured"
                  defaultValue={featured}
                  // readonly in view mode
                />
              </div>

              {/* PRODUCT */}
              <div>
                <h1 className="capitalize text-3xl font-bold">
                  {product?.title}
                </h1>
                <h6 className="text-l text-neutral-content font-bold mt-3">
                  Company: <span className="normal-case">{company?.name}</span>
                </h6>

                <h6 className="text-l text-neutral-content font-bold mt-3">
                  Category:{" "}
                  <span className="normal-case">{category?.name}</span>
                </h6>

                <h6 className="text-l text-neutral-content font-bold mt-3">
                  Price:{" "}
                  <span className="normal-case font-normal text-xl">
                    {dollarsAmount}
                  </span>
                </h6>

                <p className="my-3 text-lg font-medium text-justify">
                  {product?.description}
                </p>

                <p>
                  Colors:{" "}
                  {colors.map((color) => (
                    <span
                      key={color}
                      className="inline-block mr-2 w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </p>

                <p className="mt-3 font-semibold">Tags: {tags}</p>

                <button
                  className="btn btn-secondary btn-sm mt-8"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </section>
      </TitleCard>
    </>
  );
};

export default SingleProductAdmin;
