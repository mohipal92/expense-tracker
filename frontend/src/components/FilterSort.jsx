const FilterSort = ({ category, setCategory, sort, setSort }) => {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Filter by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Default</option>
        <option value="date_desc">Newest First</option>
      </select>
    </div>
  );
};

export default FilterSort;
