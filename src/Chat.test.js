import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import {Chat} from "./Chat";
import {initStore} from "./store";
import {actions} from "./actions";

Enzyme.configure({ adapter: new Adapter() });

const waitFor = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

describe('Chat', () => {

    let app, store;

    beforeEach(() => {

        store = initStore();

        app = mount(
            <Provider store={store}>
                <Chat/>
            </Provider>
        );
    });

    it('renders greeting message', () => {
        const message = app.find('Message');

        expect(message.text()).toEqual('Welcome to productivity app!')
    });

    it('makes delayed transition', async () => {
        await waitFor(1100);
        app.update();

        const message = app.find('Message');

        expect(message.text()).toEqual('We are helping you to visualize your thoughts. Do you like to try it? It is free!');
    });

    it('simulates the user response when the choice button "yes" is clicked', () => {
        store.dispatch(actions.makeTransition('do-you-like-to-try'));
        app.update();

        const yesButton = app.find('button[children="Yes"]');
        yesButton.simulate('click', { button: 0});

        const message = app.find('Message');

        expect(message.text()).toEqual('Yes');
    });

    it('simulates the user response when the choice button "More Details" is clicked', () => {
        store.dispatch(actions.makeTransition('do-you-like-to-try'));
        app.update();

        const yesButton = app.find('button[children="More Details"]');
        yesButton.simulate('click', { button: 0});

        const message = app.find('Message');

        expect(message.text()).toEqual('More Details');
    });

    it('after "yes" it asks for name and uses the name in the next message', async () => {
        store.dispatch(actions.makeTransition('ask-for-name'));
        app.update();

        const message = app.find('Message');
        expect(message.text()).toEqual('How can I call you?');

        const label = app.find('label');
        expect(label.text()).toEqual('My name is ');

        const input = app.find('input');
        input.simulate('change', { target: { value: 'kate'}});
        input.simulate('keyup', { keyCode: 13 });

        expect(message.text()).toEqual('My name is kate');

        await waitFor(1100);
        app.update();

        expect(message.text()).toEqual('kate, what do you want to learn it for?')

    });

    it('renders next question after user reply "more details"', async () => {
        store.dispatch(actions.makeTransition('do-you-like-to-try--more-details'));

        await waitFor(1100);
        app.update();

        const message = app.find('Message');

        expect(message.text()).toEqual('Then, tell me please, what do you expect from the product?');
    });

    it('after "more details" it asks to choose the first option-button as an answer', async () => {
        store.dispatch(actions.makeTransition('more-details'));
        app.update();

        const button = app.find('button').at(0);
        button.simulate('click', { button: 0 });

        const message = app.find('Message');

        expect(message.text()).toEqual('Generate more ideas');
    });

    it('after "more details" it asks to choose the second option-button as an answer', async() => {
        store.dispatch(actions.makeTransition('more-details'));
        app.update();

        const button = app.find('button').at(1);
        button.simulate('click', { button: 0 });

        const message = app.find('Message');

        expect(message.text()).toEqual('Visualize ideas');
    });

    it('after "more details" it asks to choose the third option-button as an answer', async() => {
        store.dispatch(actions.makeTransition('more-details'));
        app.update();

        const button = app.find('button').at(2);
        button.simulate('click', { button: 0 });

        const message = app.find('Message');

        expect(message.text()).toEqual('Create Mind Map');
    });

    it('renders the advantage to use the product if "generate-ideas"', async() => {
        store.dispatch(actions.makeTransition('more-details--generate-ideas'));

        await waitFor(1100);
        app.update();

        const message = app.find('Message');

        expect(message.text()).toEqual('Mind mapping fasters a free flow of ideas and helps spark new thoughts through association. It is perfect tool for creative brainstorming alone or in a team');
    });

    it('renders the advantage to use the product if "visualize-ideas"', async() => {
        store.dispatch(actions.makeTransition('more-details--visualize-ideas'));

        await waitFor(1100);
        app.update();

        const message = app.find('Message');

        expect(message.text()).toEqual('You can turn ideas into actionable tasks directly inside the mind map editor.' +
            'You can also assign tasks to collaborators, set priorities, add due dates and indicate' +
            'progress using a simple task widget');
    });

    it('renders the advantage to use the product if "create-mind-map"', async() => {
        store.dispatch(actions.makeTransition('more-details--create-mind-map'));

        await waitFor(1100);
        app.update();

        const message = app.find('Message');

        expect(message.text()).toEqual('With mind map editor you create, share and present mind maps right inside your web browser.' +
            'There is no need to download software or update it manually.');
    });

    it('simulates "Yes" button click if the user is ready to give a try', async() => {
        store.dispatch(actions.makeTransition('ready-to-give-it-to-try'));
        app.update();

        const button = app.find('button[children="Yes!"]').at(0);
        button.simulate('click', { button: 0 });

        const message = app.find('Message');

        expect(message.text()).toEqual('Yes!');
    });
});

