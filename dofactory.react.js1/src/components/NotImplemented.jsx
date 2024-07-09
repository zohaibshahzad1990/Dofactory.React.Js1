import React from 'react';

export const NotImplemented = ({ show, name, onClose }) => {

    return (

        show &&
        (
            <div className="modal" style={{ display: 'block', top: '12%' }} tabindex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ borderWidth: "2px" }}>

                        <div className="modal-body" style={{ background: 'aliceblue' }}>
                            <div className="font-weight-semibold">
                                The {name} module is not implemented.<br></br>
                                Neither are other modules with the <sup>&Dagger;</sup> symbol.

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-light" onClick={onClose} >Closed</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default NotImplemented;

