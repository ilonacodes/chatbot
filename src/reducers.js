import {t} from "./actions";
import {Confirmation} from "./Confirmation";

const initState = {
    currentState: 'greeting',
    fields: {},
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
        },
        {
            id: 'more-details--generate-ideas',
            side: 'user',
            message: 'Generate more ideas',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'generate-ideas'
                }
            ]
        },
        {
            id: 'more-details--visualize-ideas',
            side: 'user',
            message: 'Visualize ideas',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'visualize-ideas'
                }
            ]
        },
        {
            id: 'more-details--create-mind-map',
            side: 'user',
            message: 'Create Mind Map',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'create-mind-map'
                }
            ]
        },
        {
            id: 'generate-ideas',
            side: 'chatbot',
            message: 'Mind mapping fasters a free flow of ideas and helps spark new thoughts through association.' +
                ' It is perfect tool for creative brainstorming alone or in a team',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'ready-to-give-it-to-try'
                }
            ]
        },
        {
            id: 'visualize-ideas',
            side: 'chatbot',
            message: 'You can turn ideas into actionable tasks directly inside the mind map editor.' +
                'You can also assign tasks to collaborators, set priorities, add due dates and indicate' +
                'progress using a simple task widget',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'ready-to-give-it-to-try'
                }
            ]
        },
        {
            id: 'create-mind-map',
            side: 'chatbot',
            message: 'With mind map editor you create, share and present mind maps right inside your web browser.' +
                'There is no need to download software or update it manually.',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'ready-to-give-it-to-try'
                }
            ]
        },
        {
            id: 'ready-to-give-it-to-try',
            side: 'chatbot',
            message: 'Ready to give a try?',
            transitions: [
                {
                    button: 'Yes!',
                    nextState: 'ready-to-give-it-to-try--yes'
                },
                {
                    button: 'More details',
                    nextState: 'more-details'
                }
            ]
        },
        {
            id: 'ready-to-give-it-to-try--yes',
            side: 'user',
            message: 'Yes!',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'ask-for-name'
                }
            ]
        },
        {
            id: 'ask-for-name',
            side: 'chatbot',
            message: 'How can I call you?',
            transitions: [
                {
                    input: 'name',
                    label: 'My name is ',
                    nextState: 'ask-for-name--reply'
                }
            ]
        },
        {
            id: 'ask-for-name--reply',
            side: 'user',
            message: 'My name is $name$',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'usage-for-question'
                }
            ]
        },
        {
            id: 'usage-for-question',
            side: 'chatbot',
            message: '$name$, what do you want to learn it for?',
            transitions: [
                {
                    button: 'Work',
                    field: 'usageFor',
                    nextState: 'usage-for-question--work'
                },
                {
                    button: 'Personal life',
                    field: 'usageFor',
                    nextState: 'usage-for-question--personal-life'
                },
                {
                    button: 'Both',
                    field: 'usageFor',
                    nextState: 'usage-for-question--both'
                }
            ]
        },
        {
            id: 'usage-for-question--work',
            side: 'user',
            message: 'For work',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'where-should-I-send-tips-and-advices'
                }
            ]
        },
        {
            id: 'usage-for-question--personal-life',
            side: 'user',
            message: 'For personal life',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'where-should-I-send-tips-and-advices'
                }
            ]
        },
        {
            id: 'usage-for-question--both',
            side: 'user',
            message: 'For both',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'where-should-I-send-tips-and-advices'
                }
            ]
        },
        {
            id: 'where-should-I-send-tips-and-advices',
            side: 'chatbot',
            message: 'Where should I send tips and advices?',
            transitions: [
                {
                    input: 'email',
                    label: 'My email ',
                    nextState: 'where-should-I-send-tips-and-advices--replay'
                }
            ]
        },
        {
            id: 'where-should-I-send-tips-and-advices--replay',
            side: 'user',
            message: 'My email is $email$',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'related-articles-and-products'
                }
            ]
        },
        {
            id: 'related-articles-and-products',
            side: 'chatbot',
            message: 'Thanks! Are you interested to hear about related articles and products?',
            transitions: [
                {
                    button: 'Yes',
                    nextState: 'related-articles-and-products--yes'
                },
                {
                    button: 'No',
                    nextState: 'related-articles-and-products--no'
                }
            ]
        },
        {
            id: 'related-articles-and-products--yes',
            side: 'user',
            message: 'Yes',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'confirmation'
                }
            ]
        },
        {
            id: 'related-articles-and-products--no',
            side: 'user',
            message: 'No',
            transitions: [
                {
                    delay: 1000,
                    nextState: 'confirmation'
                }
            ]
        },
        {
            id: 'confirmation',
            side: 'chatbot',
            component: Confirmation,
            transitions: [
                {
                    button: 'Go for it!',
                    submit: 'true'
                },
                {
                    button: 'Start over',
                    nextState: 'do-you-like-to-try'
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

        case t.UPDATE_FIELD:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.field]: action.value
                }
            };

        default:
            return state;
    }
};