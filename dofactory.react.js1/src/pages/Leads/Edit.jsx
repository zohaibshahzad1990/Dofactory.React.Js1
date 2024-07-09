import { useNavigate } from 'react-router-dom';

export const Edit = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="p-30">
                Edit Lead
                <br></br>
                <br></br>

                <button onClick={() => navigate('/leads/save')}>Save</button>
                <button onClick={() => navigate(-1) }>Cancel</button>

            </div>
        </>
    );
}

export default Edit;
