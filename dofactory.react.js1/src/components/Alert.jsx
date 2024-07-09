import React from "react";

export const Alert = ({ show, message, onClose }) => {

    return (
        show &&
        (
            <div id="alert-failure" className="alert alert-error alert-dismissible">
                {message}
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
        )

    );
};

export default Alert;


//const alertIcon = (alertType) => {
//    switch (alertType) {
//        case "success":
//            return cilCheckCircle;

//        case "danger":
//            return cilWarning;

//        default:
//            return cilInfo;
//    }
//};




//<CAlert
//    color={type ? type : "primary"}
//    className="d-flex align-items-center shadow-sm"
//    visible={showAlert}
//    dismissible
//    onClose={closeAlert}
//>
//    {type ? (
//        <CIcon
//            icon={alertIcon(type)}
//            className="flex-shrink-0 me-2"
//            width={24}
//            height={24}
//        />
//    ) : (
//        ""
//    )}
//    <div>{content}</div>
//</CAlert>
