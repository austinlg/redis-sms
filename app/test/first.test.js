/**
 * @jest-environment node
 */
import React from 'react';
import FirstComponent from '../components/FirstComponent/FirstComponent';
import renderer from 'react-test-renderer';

it('component renders', () => {
    let content = {
        title: "Hello, Jest"
    }
    const tree = renderer.create(<FirstComponent content={content} firstActions={new stubbedActions()}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

class stubbedActions {
    addContent(input) {
        return;
    }
}