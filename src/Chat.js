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

const Message = ({state}) => {
    if (state.side === 'user') {
        return (
            <div className={user}>{state.message}</div>
        );
    }

    return (
        <div className={chatbot}>{state.message}</div>
    )
};

class ChatComponent extends React.Component {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(transition) {
        this.props.goToNextState(transition.nextState)
    }

    render() {
        const { states, currentState, delay } = this.props;
        const state = states.find(state => state.id === currentState);
        console.log(state);
        const delayTransition = state.transitions.find(transition => transition.delay);

        if (delayTransition) {
            delay(delayTransition);
        }

        return (
            <div>
                <Message state={state}/>

                {state.transitions.filter(transition => transition.button)
                    .map(transition =>
                        <button key={transition.button} onClick={() => this.onButtonClick(transition)}>{transition.button}</button>
                    )}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        states: state.states.states,
        currentState: state.states.currentState
    }
};

const mapDispatchToProps = dispatch => {
    return {
        delay: ({nextState}) => {
            setTimeout(() => {
                dispatch(actions.makeTransition(nextState))
            }, 1000)
        },

        goToNextState: nextState => dispatch(actions.makeTransition(nextState))
    }
};


export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatComponent);