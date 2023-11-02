import UserServices from "../services/UserServices";

export const GroupManager = () => {
    let token = UserServices.getTokenParsed()?.["group"][0]

    return {
        isApprentice: isApprentice(),
        isExternal: isExternal(),
        isStaff: isStaff(),
        isStudent: isStudent(),
        isTeacher: isTeacher()
    }

    function isApprentice () {
        return token.split("/").includes("apprentice")
    }

    function isExternal () {
        return token.split("/").includes("external")
    }

    function isStaff () {
        return token.split("/").includes("staff")
    }

    function isStudent () {
        return token.split("/").includes("student")
    }

    function isTeacher () {
        return token.split("/").includes("teacher")
    }

    function hasAll (required: any) {
        let hasAllKeys = true
        for (let key in required) {
            if (!token.split("/").includes(key)) {
                hasAllKeys = false;
            }
        }
        return hasAllKeys
    }

    function hasAny (required: any) {
        let hasAnyKeys = false
        for (let key in required) {
            if (token.split("/").includes(key)) {
                hasAnyKeys = true;
            }
        }
        return hasAnyKeys
    }
}
