const FormSelect = ({
  label,
  name,
  list,
  defaultValue,
  size,
  value,
  setValue,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        value={JSON.stringify(value)}
        onChange={(e) => setValue(JSON.parse(e.target.value))}
      >
        {list?.map((item) => {
          return (
            <option
              key={item?._id}
              value={JSON.stringify(item)}
              // selected={value?._id == item?._id}
            >
              {item?.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelect;
