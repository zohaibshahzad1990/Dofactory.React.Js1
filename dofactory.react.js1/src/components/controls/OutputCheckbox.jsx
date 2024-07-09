

export const OutputCheckbox = ({ label, value }) => {

    return (
        <div className="row mb-8">
            <label className="col-sm-4 col-form-label">{label}</label>
            <div className="col-sm-8 pt-8">
                <input type='checkbox' disabled='disabled' checked={value} />
            </div>
        </div>
    );

}

export default OutputCheckbox;