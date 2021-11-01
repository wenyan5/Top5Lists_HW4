import { useContext } from 'react'
import { GlobalStoreContext } from '../store'


function AlertModal(info) {
    const { store } = useContext(GlobalStoreContext);
    
    function handleCloseModal(event) {
        store.hideAlertListModal();
    }
    return (
        <div
            className="modal"
            id="alert-modal"
            data-animation="slideInOutLeft">
            <div className="modal-dialog">
                <header className="dialog-header">
                    Alert the  Top 5 List?
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AlertModal;