
import { Link } from 'react-router-dom';

export const Pager = ({ page, totalPages, onChange }) => {

    const handlePrevClick = () => onChange(Math.max(page - 1, 1));
    const handleNextClick = () => onChange(Math.min(page + 1, totalPages));

    const hasPrevPage = page <= 1 ? "disabled" : "";
    const hasNextPage = page >= totalPages ? "disabled" : "";

    return (
        (totalPages > 1 &&
            <div className="d-flex justify-content-center pt-20 pb-30">
                <div className="pr-15">
                    <Link onClick={handlePrevClick} className={`btn btn-sm btn-light btn-rounded ${hasPrevPage}`}>Prev</Link>
                </div>
                <div className="pt-4 font-14">Page {page} of {totalPages}</div>
                <div className="pl-15">
                    <Link onClick={handleNextClick} className={`btn btn-sm btn-light btn-rounded ${hasNextPage}`}>Next</Link>
                </div >
            </div >
        )
    );
}

export default Pager;