import UserServices from "../../services/UserServices";
import React from "react";
import Button from "../../_components/Clickable/Button";

const MyAccount = () => {
    const token = UserServices.getTokenParsed()

    return (
        <section className={"line w100 space-around items-center"}>

            <h1 className={"line w100"}>Bonjour {token?.["given_name"]} {token?.["family_name"]}</h1>

            <p className={"line w25"}>Prénom : {token?.["given_name"]}</p>
            <p className={"line w25"}>Nom : {token?.["family_name"]}</p>
            <p className={"line w25"}>Mail : {token?.["email"]}</p>
            <p className={"line w25"}>Groupe : {token?.["group"]}</p>

            <Button content={"Gérer mon compte"} onclick={UserServices.manageAccount}/>

        </section>
    )
}

export default MyAccount
