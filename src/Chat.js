import React from 'react';
import {connect} from "react-redux";
import {actions} from "./actions";
import {css} from "emotion";

const user = css`
    color: blue;
`;

const chatbot = css`
    color: green;
`;

export const renderMessage = (message, fields) => {
    let messageWithFields = message;
    Object.keys(fields).map(field =>
        messageWithFields = messageWithFields.replace('$' + field + '$', fields[field])
    );
    return messageWithFields;
};

const Message = ({state, fields}) => {
    if (state.component) {
        return state.component({fields: fields})
    }

    if (state.side === 'user') {
        return (
            <div className={user}>{renderMessage(state.message, fields)}</div>
        );
    }

    return (
        <div className={chatbot}>{renderMessage(state.message, fields)}</div>
    )
};

class ChatComponent extends React.Component {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onInputKeyPress = this.onInputKeyPress.bind(this);
    }

    onButtonClick(transition) {
        if (transition.field) {
            this.props.updateField(transition.field, transition.button)
        }

        if (transition.submit) {
            console.log('You have been successfully signed up!', this.props.fields);
            return;
        }

        this.props.goToNextState(transition.nextState)
    }

    onInputKeyPress(e, nextState) {
        e.preventDefault();
        if (e.keyCode === 13) {
            return this.props.goToNextState(nextState)
        }
    }

    render() {
        const { states, currentState, delay, updateField, fields } = this.props;

        const state = states.find(state => state.id === currentState);

        const delayTransition = state.transitions.find(transition => transition.delay);

        if (delayTransition) {
            delay(delayTransition);
        }

        return (
            <div>
                <Message state={state} fields={fields}/>

                {state.transitions.filter(transition => transition.button)
                    .map(transition =>
                        <button key={transition.button} onClick={() => this.onButtonClick(transition)}>{transition.button}</button>
                    )}
                    
                {state.transitions.filter(transition => transition.input)
                    .map(transition =>
                        <div key={transition.input}>
                            <label>{transition.label}</label>
                            <input type="text"
                                   placeholder="enter it here"
                                   onChange={e => updateField(transition.input, e.target.value)}
                                   onKeyUp={e => this.onInputKeyPress(e, transition.nextState)}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        states: state.states.states,
        currentState: state.states.currentState,
        fields: state.states.fields
    }
};

const mapDispatchToProps = dispatch => {
    return {
        delay: ({nextState}) => {
            setTimeout(() => {
                dispatch(actions.makeTransition(nextState))
            }, 1000)
        },

        goToNextState: nextState => dispatch(actions.makeTransition(nextState)),

        updateField: (field, value) => dispatch(actions.updateField(field, value))
    }
};


export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
