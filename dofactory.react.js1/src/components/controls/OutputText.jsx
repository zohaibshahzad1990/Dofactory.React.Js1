
export const OutputText = ({ label, value }) => {

    return (
        <div className="row mb-8">
            <label className="col-sm-4 col-form-label">{label}</label>
            <div className="col-sm-8 pt-8">{value}</div>
        </div>
    );
}

export default OutputText;