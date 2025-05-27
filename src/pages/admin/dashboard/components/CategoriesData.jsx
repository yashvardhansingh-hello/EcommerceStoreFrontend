

const CategoriesData = ({ data }) => {
        // { "_id": "66420...", "name": "Electronics", "count": 15 },

  return (
    <div  className="stat rounded-lg bg-base-100 shadow">
        <div className="stat-title font-bold capitalize">{data?.name}</div>
        <div className="stat-value">{data?.count} <span className="text-xs text-neutral-500">items</span></div>
    </div>
  );
};

export default CategoriesData;