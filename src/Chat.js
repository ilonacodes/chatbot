import React from 'react';
import {connect} from "react-redux";
import {actions} from "./actions";

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
                <p>{state.message}</p>

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