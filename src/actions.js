export const t = {
    MAKE_TRANSITION: 'MAKE_TRANSITION',
    UPDATE_FIELD: 'UPDATE_FIELD'
};

export const actions = {
    makeTransition: nextState => ({
        type: t.MAKE_TRANSITION,
        nextState
    }),

    updateField: (field, value) => ({
        type: t.UPDATE_FIELD,
        field,
        value
    })
};

