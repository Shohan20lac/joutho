export enum EventType {
    STALL_EVENT = "stall-event",
}

export const EventConstant = {
    Stall: {
        Sync: {
            REQUEST: "stall-sync-request",
            RESPONSE: "stall-sync-response",
        },
        Admin: {
            MANNED_STALL: {
                NOTIFY: "admin-manned-stall-notify",
                ACKNOWLEDGE: "admin-manned-stall-acknowledge",
            },
            APPROVED_VISITOR_TRAIT: {
                NOTIFY: "admin-approved-visitor-trait-notify",
                ACKNOWLEDGE: "admin-approved-visitor-trait-acknowledge",
            }
        },
        Visitor: {
            CAME: {
                NOTIFY: "visitor-came-notify",
                ACKNOWLEDGE: "visitor-came-acknowledge",
            },
            SELECTED_TRAIT: {
                NOTIFY: "visitor-selected-trait-notify",
                ACKNOWLEDGE: "visitor-selected-trait-acknowledge",
            }
        }
    }
}