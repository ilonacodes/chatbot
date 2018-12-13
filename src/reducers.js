import {t} from "./actions";

const initState = {
    currentState: 'greeting',
    states: [
        {
            id: 'greeting',
            side: 'chatbot',
            message: 'Welcome to productivity app!',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'do-you-like-to-try'
                }
            ]
        },
        {
            id: 'do-you-like-to-try',
            side: 'chatbot',
            message: 'We are helping you to visualize your thoughts. Do you like to try it? It is free!',
            transitions: [
                {
                    button: 'Yes',
                    nextState: 'do-you-like-to-try--yes'
                },
                {
                    button: 'More Details',
                    nextState: 'do-you-like-to-try--more-details'
                }
            ]
        },
        {
            id: 'do-you-like-to-try--yes',
            side: 'user',
            message: 'Yes',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'ask-for-name'
                }
            ]
        },
        {
            id: 'do-you-like-to-try--more-details',
            side: 'user',
            message: 'More Details',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'more-details'
                }
            ]
        },
        {
            id: 'more-details',
            side: 'chatbot',
            message: 'Then, tell me please, what do you expect from the product?',
            transitions: [
                {
                    button: 'Generate more ideas',
                    nextState: 'more-details--generate-ideas'
                },
                {
                    button: 'Visualize ideas',
                    nextState: 'more-details--visualize-ideas'
                },
                {
                    button: 'Create Mind Map',
                    nextState: 'more-details--create-mind-map'
                }
            ]
        }
    ]
};

export const statesReducer = (state = initState, action) => {
    switch (action.type) {
        case t.MAKE_TRANSITION:
            return {
                ...state,
                currentState: action.nextState
            };

        default:
            return state;
    }
};