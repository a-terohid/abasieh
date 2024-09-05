import { TRUSTEES_ROLE } from "@/types/enums";
import { TRUSTEES_PERSONE } from "@/types/types";

export const sortTrustees = (trustees: TRUSTEES_PERSONE[]): TRUSTEES_PERSONE[] => {
    const roleOrder = {
        [TRUSTEES_ROLE.BOSS]: 1,
        [TRUSTEES_ROLE.NORMAL]: 2,
        [TRUSTEES_ROLE.PLUS]: 3,
    };

    return trustees.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
};