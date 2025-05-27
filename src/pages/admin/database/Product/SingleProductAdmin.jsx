import { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState(["#000"]);
  const [shipping, setShipping] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState("");

  const [lazySingleProductFetch] = useLazySingleProductAdminQuery();

  const [extraImages, setExtraImages] = useState([]);
  const [extraImageFiles, setExtraImageFiles] = useState([]);

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) {
      toast.error("You can upload only 2 extra images");
      return;
    }
    const previews = files.map((file) => URL.createObjectURL(file));
    setExtraImages((prev) => [ ...previews]);
    setExtraImageFiles((prev) => [ ...files]);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const res = await lazySingleProductFetch(productId);

        setProduct(res?.data?.product);

        const p = res.data.product;

        setProduct(p);
        setTitle(p.title);
        setPrice(p.price);
        setCompany(p.company);
        setCategory(p.category);
        setDescription(p.description);
        setShipping(p.shipping);
        setFeatured(p.featured);
        setTags(p.tags.toString());
        setColors(p.colors.toString());
        setProductColor(p.colors[0]);
        setImage(p.image.url);
        setExtraImages(p.extraImages.map((i) => i.url));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [editMode]);

  const [productColor, setProductColor] = useState(colors[0]);

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
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const [updateProductMutation] = useAsyncMutation(useUpdateProductMutation);

  const updateProductHandler = async () => {
    const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("categoryId", category?._id);
    formdata.append("companyId", company?._id);
    formdata.append("price", Number(price));
    formdata.append("description", description);
    formdata.append("shipping", shipping);
    formdata.append("featured", featured);
    formdata.append("productId", productId);
    formdata.append("tags", tags.split(","));
    // formdata.append("colors", colors.split(","));

    if (file) formdata.append("avatar", file);

    // Extra images
    extraImageFiles.forEach((file) => {
      formdata.append("files", file);
    });

    await updateProductMutation("updating product ...", formdata);

    setEditMode(false);
  };

  const [deleteProductMutation] = useAsyncMutation(useDeleteProductMutation);
  const deleteProductHandler = async () => {
    await deleteProductMutation("deleting product ...", productId);
    navigate("/admin/product");
  };

  return isLoading ? (
    <Loading />
  ) : (
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

          {editMode ? (
            <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
              {/* IMAGE */}

              <div>
                <div className="relative mb-2 mt-5">
                  <img
                    src={image}
                    alt={product?.title}
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
                    {(extraImages
                    )?.map((img, idx) => (
                      <img
                        key={idx}
                        src={
                          img || "/default.png"
                        }
                        alt={`extra-${idx}`}
                        className="w-34 h-24 object-cover rounded"
                      />
                    ))}
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
                      onClick={(e) => updateProductHandler(e)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-secondary btn-md mr-4"
                      onClick={(e) => deleteProductHandler(e)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary btn-md"
                      onClick={(e) => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
              {/* IMAGE */}
              <div>
                <img
                  src={product?.image?.url}
                  alt={product?.title}
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
                  // updateFormValue={setShipping}
                />
                <ToogleInput
                  updateType="syncData"
                  labelTitle="Featured"
                  defaultValue={featured}
                  // updateFormValue={setFeatured}
                />
              </div>
              {/* PRODUCT */}
              <div>
                <>
                  <h1 className="capitalize text-3xl font-bold">
                    {product?.title}
                  </h1>
                  <h6 className="text-l text-neutral-content font-bold mt-2">
                    {product?.category?.name}
                  </h6>
                  <h4 className="text-xl text-neutral-content font-bold mt-2">
                    {product?.company?.name}
                  </h4>
                  <p className="mt-3 text-xl">{dollarsAmount}</p>
                  <p className="mt-2 leading-8">{product?.description}</p>
                  <p className="mt-2 leading-8">
                    <strong>Tags : </strong> {product?.tags?.toString()}
                  </p>

                  {/* COLORS */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium tracking-wider capitalize">
                      colors
                    </h4>
                    <div className="mt-2">
                      {product?.colors?.map((color) => {
                        return (
                          <button
                            key={color}
                            type="button"
                            className={`badge w-6 h-6 mr-2 ${
                              color === color && "border-2 border-secondary"
                            }`}
                            style={{ backgroundColor: color }}
                            // onClick={() => setProductColor(color)}
                          ></button>
                        );
                      })}
                    </div>
                  </div>

                  {/* AMOUNT */}
                  {/* <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={product?.amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
          </div> */}
                  {/* CART BTN */}
                  <div className="mt-10">
                    <button
                      className="btn btn-secondary btn-md"
                      onClick={(e) => setEditMode(true)}
                    >
                      Edit
                    </button>
                  </div>
                </>
              </div>
            </div>
          )}
        </section>
      </TitleCard>
    </>
  );
};

export default AdminLayout()(SingleProductAdmin);
