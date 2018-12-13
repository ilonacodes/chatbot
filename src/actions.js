export const t = {
    MAKE_TRANSITION: 'MAKE_TRANSITION'
};

export const actions = {
    makeTransition: nextState => ({
        type: t.MAKE_TRANSITION,
        nextState
    })
};

