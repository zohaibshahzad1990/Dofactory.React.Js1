import React from 'react';

export const Delete = ({ show, name, onCancel, onDelete }) => {

    return (

        show &&
        (
            <div className="modal" style={{ display: 'block', top: '12%' }} tabindex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ borderWidth: "2px" }}>

                        <div className="modal-body" style={{ background: 'aliceblue' }}>
                            <div className="font-weight-semibold">Delete {name}?</div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-dark" onClick={onDelete}>Delete</button>
                            <button type="button" className="btn btn-sm btn-light" onClick={onCancel} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Delete;
