
export const Filter = ({ value, items, onChange }) => {

    const handleChange = (event) => onChange(event.target.value);

    return (
        <select name="filter-value" value={value} onChange={handleChange} className="form-select width-240">
            {items.map((item) => (
                <option key={item.value} value={item.value}>
                    {item.text}
                </option>
            ))}
        </select>
    );
}

export default Filter;