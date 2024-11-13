import {useContext} from "react";
import {ModalContext} from "../../Providers/ModalProvider";
import { Modal } from "../../Providers/Modals/Modal";
import "./index.scss";
import { RightComponent } from "./RightComponent";

export const HomeScreen =()=>{
    const modalFeatures = useContext(ModalContext);

    const openCreatePlaygroundModal=()=>{
        modalFeatures.openModal("CREATE_PLAYGROUND");
    }

    return (
        <div className="home-container">
            <div className="left-container">
                <div className="items-container">
                    <img src="logo.png"  alt="CodeX"/>
                    <h1>CodeX </h1>
                    <h2>Code.Compile.Debug</h2>
                    <button onClick={openCreatePlaygroundModal}>
                        <span className="material-icons">add</span>
                        <span>Create Playground</span>
                    </button>
                </div>
            </div>
            <RightComponent></RightComponent>
            <Modal></Modal>
        </div>
    );

}