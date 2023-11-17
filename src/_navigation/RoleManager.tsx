import UserServices from "../services/UserServices";
import {isExternal} from "util/types";

export const RoleManager = () => {

    return {
        isApprentice: isApprentice(),
        isApprenticeshipManager: isApprenticeshipManager(),
        isExternal: isExternal(),
        isNewsManager: isNewsManager(),
        isStudent: isStudent(),
        isStudentSupervisor: isStudentSupervisor(),
        isStudentTutor: isStudentTutor(),
        isTeacher: isTeacher()
    }

    function isApprentice () {
        return UserServices.hasRole("apprentice")
    }

    function isApprenticeshipManager () {
        return UserServices.hasRole("apprenticeship-manager")
    }

    function isExternal () {
        return UserServices.hasRole("external")
    }

    function isNewsManager () {
        return UserServices.hasRole("news-manager")
    }

    function isStudent () {
        return UserServices.hasRole("student")
    }

    function isStudentTutor () {
        return UserServices.hasRole("student-tutor")
    }

    function isStudentSupervisor () {
        return UserServices.hasRole("student-supervisor")
    }

    function isTeacher () {
        return UserServices.hasRole("teacher")
    }

    function hasAll (required: any) {
        let hasAllKeys = true
        for (let key in required) {
            if (!UserServices.hasRole(key)) {
                hasAllKeys = false;
            }
        }
        return hasAllKeys
    }

    function hasAny (required: any) {
        let hasAnyKeys = false
        for (let key in required) {
            if (UserServices.hasRole(key)) {
                hasAnyKeys = true;
            }
        }
        return hasAnyKeys
    }
}
