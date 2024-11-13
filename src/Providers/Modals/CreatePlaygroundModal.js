import { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

export const CreatePlaygroundModal=()=>{
    const modalFeatures=useContext(ModalContext);
    const playgroundFeatues=useContext(PlaygroundContext);

   const closeModal=()=>{
        modalFeatures.closeModal();
   }
   const onSubmitModal=(e)=>{
        e.preventDefault();
        const folderNAme=e.target.folderName.value;
        const fileName=e.target.fileName.value;
        const language=e.target.language.value;
        playgroundFeatues.createNewPlayground({
            folderNAme,
            fileName,
            language
        });
       
        closeModal();
   }

    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
            <span onClick={closeModal} className="material-icons close">close</span>
            <h1>Create New Playground</h1>
            <div className="item">
                <p>Enter folder Name</p>
                <input name="folderName" required/>
            </div>
            <div className="item">
                <p>Enter card name</p>
                <input name="fileName" required/>
            </div>
            <div className="item">
                <select name="language" required>
                    <option value="cpp">CPP</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                </select>
                <button type="submit">
                    Create Playground
                </button>
            </div>
        </form>
    </div>
}